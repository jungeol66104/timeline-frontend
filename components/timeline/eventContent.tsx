import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {
    updateIsToggle,
    updateLastAction,
    updateToggleEvents,
    updateTotalHeight
} from "@/store/slices/eventsSlice";
import React, {RefObject, useEffect, useRef} from "react";
import {RootState} from "@/store/rootReducer";
import gsap from "gsap";
import Link from "next/link";


const EventContent = ({event, eventOrder, contentOrder, isToggle, isPrev} : {event: TimelineEvent, eventOrder: number, contentOrder: number, isToggle?: boolean, isPrev?: boolean}) => {
    const eventContentRef : RefObject<HTMLDivElement> = useRef(null)

    const dispatch = useDispatch()
    const data: TimelineEvent[] = useSelector((state: RootState) => state.events.data)
    const totalHeight = useSelector((state: RootState) => state.events.totalHeight)
    const lastAction = useSelector((state: RootState) => state.events.lastAction)

    let isZooming = true
    if (lastAction === 'zoomIn' || lastAction === 'zoomOut') {setTimeout(() => {isZooming = false}, 500)}
    else {isZooming = false}

    const handleClick = () => {
        if (isZooming) return
        if ((!isToggle && contentOrder === 0 && event.overlap === 0) || isToggle) return
        const newToggleEvents = data.filter(e => e.julianDate === event.julianDate).filter(e => e.id !== event.id)
        // should generalize the layout states globally
        const newTotalHeight = totalHeight - (124 + event.overlap * 6) + (38 + (newToggleEvents.length + 1) * 124)
        dispatch(updateToggleEvents({order: eventOrder, toggleEvents: newToggleEvents}))
        dispatch(updateIsToggle(eventOrder))
        dispatch(updateLastAction('toggle'))
        dispatch(updateTotalHeight(newTotalHeight))
    }

    const zIndex = 9999 - contentOrder
    let top = contentOrder === 0 ? 0 : contentOrder === 1 ? 18 : 36
    let left = contentOrder === 0 ? 0 : contentOrder === 1 ? 6 : 12
    let height = contentOrder === 0 ? 112 : contentOrder === 1 ? 100 : 88
    let width = contentOrder === 0 ? `100%` : contentOrder === 1 ?  `calc(100% - 12px)` : `calc(100% - 24px)`
    let opacity = contentOrder > 0 ? 0 : 1
    if (isToggle) {
        top = 38 + contentOrder * 124
        left = 0
        height = 112
        width = `100%`
        opacity = 1
    }

    useEffect(() => {
        const eventContent = eventContentRef.current
        if (!eventContent || isPrev || event.prev || lastAction === 'render') return
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
        <div ref={eventContentRef} onClick={handleClick} className={`eventContent absolute cursor-pointer bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5 ${(!isToggle && contentOrder > 0 ? 'pointer-events-none' : '')}`} style={{top: top, left: left, height: height, width: width, opacity: opacity, zIndex: zIndex}}>
            <Link href={`/events/${event.id}`} className={(!isToggle && contentOrder === 0 && event.overlap === 0 ) || isToggle ? '' : `pointer-events-none`}>
                <div className={'flex gap-2.5'}>
                    <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
                    <div className={'text-[12px] text-gray-500 line-clamp-1 overflow-hidden'}>{event.tag}</div>
                </div>
                <div className={'mt-0.5 font-black'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.title}</div>
                <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.content}</div>
            </Link>
        </div>
    )
}

export default EventContent