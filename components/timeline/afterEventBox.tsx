import {TimelineEvent} from "@/store/slices/contentsSlice";
import React, {RefObject, useEffect, useRef} from "react";
import gsap from "gsap";
import EventNode from "@/components/timeline/eventNode";
import {useSelector} from "react-redux";
import AfterEventList from "@/components/timeline/afterEventList";
import {selectLastAction} from "@/store/slices/appearanceSlice";
import {selectPrevEventsWithEffect} from "@/store/slices/contentsSlice";
// refactoring: clear

const AfterEventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector(selectLastAction)
    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = prevEventsWithEffect[eventOrderInPrev].isToggle

    let zIndex = event.animation === 'move' ? 20 : ''
    let paddingBottom = event.overlap === 0 || isToggle ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'

    useEffect(() => {
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        if (lastAction === 'zoom') {
            if (event.animation === 'fadeOut') {
                tl.fromTo(eventBox, {opacity: 1}, {opacity: 0, duration: 0.5, ease: 'ease-in-out'})
            } else if (event.animation === 'move') {
                tl.fromTo(eventBox, {y: event.distance}, {y: '0', duration: 0.5, ease: 'ease-in-out'})
            } else if (event.animation === 'blank') {
                tl.fromTo(eventBox, {opacity: 0}, {opacity: 0})
            } else {
                console.error('invalid event animation: ', event)
            }
        }
        tl.play()
        return ()=> {tl.kill()}
    });
    return (
        <div ref={eventBoxRef} className={`eventBox relative flex pt-[6px] flex-shrink-0 ${paddingBottom}`} style={{zIndex: zIndex}}>
            <EventNode />
            <AfterEventList event={event}/>
        </div>
    )
}
export default AfterEventBox