import {RefObject, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import gsap from "gsap";
import {TimelineEvent} from "@/public/events";
import EventNode from "@/components/timeline/eventNode";
import EventList from "@/components/timeline/eventList";
import {selectCurrentEvents} from "@/store/slices/eventsSlice";
import {selectLastAction} from "@/store/slices/effectsSlice";
// refactoring: needed (animation logic)

const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)

    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = currentEvents[eventOrderInCurrent].isToggle
    const lastAction = useSelector(selectLastAction)

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