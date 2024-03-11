import React, {RefObject, useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import gsap from "gsap";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import EventNode from "@/components/timeline/eventNode";
import EventList from "@/components/timeline/eventList";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";
import {selectLastAction} from "@/store/slices/appearanceSlice";
// refactoring: clear

const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector(selectLastAction)
    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    // const isToggle = currentEvents[eventOrderInCurrent].isToggle
    const isToggle = false

    let zIndex = event.animation === 'fadeIn' ? '10' : '20'
    let paddingBottom = event.overlap === 0 || isToggle ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'

    // animation after rendering
    // useEffect(() => {
    //     const eventBox = eventBoxRef.current
    //     if (!eventBox || event.animation === 'none') return
    //     const tl = gsap.timeline()
    //     if (lastAction === 'zoom' || lastAction === 'scroll') {
    //          if (event.animation === 'fadeIn') {
    //             tl.fromTo(eventBox, {opacity: 0}, {opacity: 1, duration: 0.5, ease: 'ease-in-out'})
    //         } else if (event.animation === 'move') {
    //             tl.fromTo(eventBox, {y: event.distance}, {y: '0', duration: 0.5, ease: 'ease-in-out'})
    //         } else {
    //             console.error('Invalid event animation: ', event)
    //         }
    //     }
    //     tl.play()
    //     return ()=> {tl.kill()}
    // });

    return (
        <div ref={eventBoxRef} className={`eventBox relative flex pt-[6px] flex-shrink-0 ${paddingBottom}`} style={{zIndex: zIndex}}>
            <EventNode />
            <EventList event={event}/>
        </div>
    )
}
export default EventBox