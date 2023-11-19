import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RefObject, useEffect, useRef} from "react";
import gsap from "gsap";
import Link from "next/link";
import api from "@/utils/api";
import {selectCurrentEvents, selectCurrentTimeline, updateIsToggle, updateToggleEvents,} from "@/store/slices/contentsSlice";
import {selectLastAction, selectTotalHeight, updateLastAction, updateTotalHeight} from "@/store/slices/appearanceSlice";
import {getClickOrTouch} from "@/utils/global";
// refactoring: clear

const EventContent = ({event, highestEvent, contentOrder, isToggle} : {event: TimelineEvent, highestEvent: TimelineEvent, contentOrder: number, isToggle?: boolean}) => {
    const eventContentRef : RefObject<HTMLDivElement> = useRef(null)

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === highestEvent.id)
    const totalHeight = useSelector(selectTotalHeight)
    const lastAction = useSelector(selectLastAction)

    let isLoading = true
    if (lastAction === 'zoom' || lastAction === 'scroll') {setTimeout(() => {isLoading = false}, 500)}
    else {isLoading = false}

    // useEffect(() => {
    //     const eventContent = eventContentRef.current
    //     const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
    //     if (!eventContent || !scrollWrapper) return
    //
    //     let clickOrTouchend = getClickOrTouch()
    //
    //     // disable handleClick when it is swipe motion
    //     let isSwipe = false
    //
    //     const fetchToggleEvents = async () => {
    //         try {
    //             const response = await api.post('/v1/getEventsByTime', {'timelineId': currentTimeline.id, 'julianDate': highestEvent.julianDate})
    //             const newToggleEvents = response.data.data.events
    //             const newTotalHeight = totalHeight - (124 + (event.overlap as number) * 6) + (38 + (newToggleEvents.length + 1) * 124)
    //             return { newToggleEvents, newTotalHeight }
    //         } catch (error) {
    //             console.error('Error fetching toggle events: ', error);
    //             return {newToggleEvents: [], newTotalHeight: 0}
    //         }
    //     }
    //     const operateToggle = async (e: MouseEvent | TouchEvent) => {
    //         try {
    //             if (!isToggle && contentOrder === 0 && event.overlap !== 0) {
    //                 e.preventDefault()
    //                 let { newToggleEvents, newTotalHeight} = await fetchToggleEvents()
    //                 dispatch(updateToggleEvents({order: eventOrderInCurrent, toggleEvents: newToggleEvents}))
    //                 dispatch(updateIsToggle(eventOrderInCurrent))
    //                 dispatch(updateTotalHeight(newTotalHeight))
    //                 dispatch(updateLastAction('toggle'))
    //             } else return
    //         } catch (error){
    //             console.error('Error updating toggle events: ', error);
    //         }
    //     }
    //     const handleClick = async (e: MouseEvent | TouchEvent) => {
    //         if (isSwipe) return
    //         if (isLoading) return
    //         await operateToggle(e)
    //     }
    //
    //     if (clickOrTouchend === 'click') eventContent.addEventListener('click', handleClick)
    //     else eventContent.addEventListener('touchend', handleClick)
    //     scrollWrapper.addEventListener('touchmove', () => isSwipe = true)
    //     scrollWrapper.addEventListener('touchend', () => isSwipe = false)
    //     return () => {
    //         if (clickOrTouchend === 'click') eventContent.removeEventListener(clickOrTouchend, handleClick)
    //         else eventContent.removeEventListener('touchend', handleClick)
    //         scrollWrapper.removeEventListener('touchmove', () => isSwipe = true)
    //         scrollWrapper.removeEventListener('touchend', () => isSwipe = false)
    //     }
    // });

    // set css
    const zIndex = 5000 - contentOrder
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

    // toggle animation
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
        <div className={'eventContent absolute'} style={{top: top, left: left, height: height, width: width, opacity: opacity, zIndex: zIndex}}>
            <a href={`/events/1`}>
                <div className={`bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5`}>
                        <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
                        <div className={'mt-0.5 font-black line-clamp-1 overflow-hidden'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.name}</div>
                        <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.description}</div>
                </div>
            </a>
        </div>
    )
    // return (
    //     <div ref={eventContentRef} className={'eventContent absolute cursor-pointer'} style={{pointerEvents: !isToggle && contentOrder === 0 && event.overlap !== 0 ? 'auto' : 'none', top: top, left: left, height: height, width: width, opacity: opacity, zIndex: zIndex}}>
    //         <Link href={`/events/${event.id}`} style={{pointerEvents: (!isToggle && ((contentOrder === 0 && event.overlap !== 0) || (contentOrder !== 0 && event.overlap === 0 ))) ? 'none' : 'auto'}}>
    //             <div className={`bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5`}>
    //                 <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
    //                 <div className={'mt-0.5 font-black line-clamp-1 overflow-hidden'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.name}</div>
    //                 <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.description}</div>
    //             </div>
    //         </Link>
    //     </div>
    // )
}
export default EventContent