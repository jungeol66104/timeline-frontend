import {TimelineEvent} from "@/public/events";
import React, {RefObject, useEffect, useRef} from "react";
import gsap from "gsap";
import EventNode from "@/components/timeline/eventNode";
import {useSelector} from "react-redux";
import {RootState} from "@/store/rootReducer";
import AfterEventList from "@/components/timeline/afterEventList";

const AfterEventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    const lastAction = useSelector((state: RootState) => state.events.lastAction)
    const prevEventsWithEffect = useSelector((state: RootState) => state.events.prevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.events.prevEventsWithEffect[eventOrderInPrev].isToggle)

    let animation = event.fadeout ? 'animate-fadeOut' : ''
    let zIndex = event.fadeout ? '' : 'z-20'
    let paddingBottom = event.overlap === 0 || isToggle ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'
    let opacity = event.blank === true ? 'opacity-0' : ''

    useEffect(() => {
        if (lastAction === 'scroll' || lastAction === 'toggle') return
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    })

    return (
        <div ref={eventBoxRef} className={`eventBox relative flex pt-[6px] flex-shrink-0 ${paddingBottom} ${animation} ${zIndex} ${opacity}`}>
            <EventNode />
            <AfterEventList event={event}/>
        </div>
    )
}

export default AfterEventBox