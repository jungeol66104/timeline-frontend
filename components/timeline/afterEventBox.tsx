import {TimelineEvent} from "@/public/events";
import React, {RefObject, useEffect, useRef} from "react";
import gsap from "gsap";
import EventNode from "@/components/timeline/eventNode";
import EventContent from "@/components/timeline/eventContent";
import OverlapContent1 from "@/components/timeline/overlapContent1";
import OverlapContent2 from "@/components/timeline/overlapContent2";

const AfterEventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    let zIndex = event.fadeout ? '' : 'z-20'
    let paddingBottom = event.overlap === 0 ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'
    useEffect(() => {
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    })
    return (
        <div ref={eventBoxRef} className={`relative flex pt-[6px] ${paddingBottom} animate-fadeOut ${zIndex}`}>
            <EventNode />
            <EventContent event={event}/>
            <OverlapContent1 event={event}/>
            <OverlapContent2 event={event}/>
        </div>
    )
}

export default AfterEventBox