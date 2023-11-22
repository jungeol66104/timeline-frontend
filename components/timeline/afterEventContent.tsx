import {TimelineEvent} from "@/store/slices/contentsSlice";
import {useSelector} from "react-redux";
import {RefObject, useEffect, useRef} from "react";
import gsap from "gsap";
import {selectLastAction} from "@/store/slices/appearanceSlice";
// refactoring: clear

const AfterEventContent = ({event, highestEvent, contentOrder, isToggle} : {event: TimelineEvent, highestEvent: TimelineEvent, contentOrder: number, isToggle?: boolean}) => {
    const eventContentRef : RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector(selectLastAction)

    const zIndex = 10
    let top: number, left, height, width: string, opacity
    if (isToggle) {
        top = 38 + contentOrder * 124
        left = 0
        height = 112
        width = `100%`
        opacity = 1
    } else {
        top = contentOrder === 0 ? 0 : contentOrder === 1 ? 18 : 36
        left = contentOrder === 0 ? 0 : contentOrder === 1 ? 6 : 12
        height = contentOrder === 0 ? 112 : contentOrder === 1 ? 100 : 88
        width = contentOrder === 0 ? `100%` : contentOrder === 1 ?  `calc(100% - 12px)` : `calc(100% - 24px)`
        opacity = contentOrder > 0 ? 0 : 1
    }

    useEffect(() => {
        const eventContent = eventContentRef.current
        if (!eventContent || lastAction !== 'toggle') return
        const tl = gsap.timeline()
        if (isToggle) {
            let y =  contentOrder === 0 ? top : contentOrder === 1 ? top - 18 : top - 36
            let x = contentOrder < 2 ? contentOrder * 6 : 2 * 6
            let prevWidth = contentOrder < 2 ? eventContent.getBoundingClientRect().width - contentOrder * 12 : eventContent.getBoundingClientRect().width - 2 * 12
            tl.fromTo(eventContent, {y: -y, x: x, opacity: contentOrder > 0 ? 0 : 1, width: prevWidth}, {y: '0', x:'0', opacity: 1, duration: 0.5, width: width, ease: 'ease-in-out'})
        } else {
            let y =  contentOrder === 0 ? 38 + contentOrder * 124 : contentOrder === 1 ? 38 + contentOrder * 124 - 18 : 38 + contentOrder * 124 - 36
            let x = contentOrder < 2 ? contentOrder * 6 : 2 * 6
            tl.fromTo(eventContent, {y: y, x: -x, opacity: 1, width: '100%'}, {y: '0', x:'0', opacity: contentOrder > 0 ? 0 : 1, duration: 0.5, width: width, ease: 'ease-in-out'})
        }
        tl.play()
        return ()=> {tl.kill()}
    }, [isToggle]);

    return (
        <div ref={eventContentRef} className={'eventContent absolute cursor-pointer'} style={{pointerEvents: !isToggle && contentOrder === 0 && event.overlap !== 0 ? 'auto' : 'none', top: top, left: left, height: height, width: width, opacity: opacity, zIndex: zIndex}}>
                <div className={`bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5`}>
                    <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
                    <div className={'mt-0.5 font-black line-clamp-1 overflow-hidden'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.name}</div>
                    <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.description}</div>
                </div>
        </div>
    )
}

export default AfterEventContent