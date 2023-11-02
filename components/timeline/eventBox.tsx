import {TimelineEvent} from "@/public/events";
import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/rootReducer";
import gsap from "gsap";
import EventNode from "@/components/timeline/eventNode";
import EventList from "@/components/timeline/eventList";
import {updateToggleEvents} from "@/store/slices/eventsSlice";

const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector((state: RootState) => state.events.lastAction)
    const currentEvents = useSelector((state: RootState) => state.events.currentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.events.currentEvents[eventOrderInCurrent].isToggle)

    let animation = event.fadeout ? 'animate-fadeOut' : event.distance !== undefined ? '' :'animate-fadeIn'
    if (lastAction) {}
    let zIndex = event.fadeout || animation === 'animate-fadeIn' ? '' : 'z-20'
    let paddingBottom = event.overlap === 0 || isToggle ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'

    useEffect(() => {
        if (lastAction !== 'zoomIn' && lastAction !== 'zoomOut') return
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    })

    return (
        <div ref={eventBoxRef} className={`eventBox relative flex pt-[6px] flex-shrink-0 ${paddingBottom} ${animation} ${zIndex}`}>
            <EventNode />
            <EventList event={event}/>
        </div>
    )
}

export default EventBox