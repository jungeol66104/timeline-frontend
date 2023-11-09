import {TimelineEvent} from "@/public/events";
import {useSelector} from "react-redux";
import {selectCurrentEvents, selectPrevEventsWithEffect} from "@/store/slices/contentsSlice";
import {useEffect, useRef} from "react";
import gsap from "gsap";
// refactoring: clear

const OverlapContent = ({event, order} : {event: TimelineEvent, order: number}) => {
    const overlapContentRef = useRef(null)

    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const prevEventsWithEffect = useSelector(selectPrevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = !event.prev ? currentEvents[eventOrderInCurrent].isToggle : prevEventsWithEffect[eventOrderInPrev].isToggle
    const display = order === 0 && event.overlap !== 0 ? '' : order === 1 && event.overlap === 2 ? '' : 'hidden'

    useEffect(() => {
        const overlapContent = overlapContentRef.current
        if (!overlapContent) return
        const tl = gsap.timeline()
        tl.fromTo(overlapContent, {opacity: isToggle ? 1 : 0 }, {opacity: isToggle ? 0 : 1, duration: 0.5, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    }, [isToggle]);


    // display
    let top, left, height, width, zIndex
    if (order === 0) {
        top = 18
        left = 6
        height = 100
        width = 'calc(100% - 12px)'
        zIndex = -10
    } else {
        top = 36
        left = 12
        height = 88
        width = 'calc(100% - 24px)'
        zIndex = -20
    }

    return (
        <div ref={overlapContentRef} className={`${display} flex-shrink-0 absolute bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md`} style={{top: top, left: left, height: height, width: width, zIndex: zIndex}}></div>
    )
}

export default OverlapContent