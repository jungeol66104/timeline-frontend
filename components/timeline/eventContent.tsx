import {TimelineEvent} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {RefObject, useRef} from "react";
import Link from "next/link";
import {selectLastAction} from "@/store/slices/appearanceSlice";
// refactoring: clear

const EventContent = ({event, highestEvent, contentOrder, isToggle} : {event: TimelineEvent, highestEvent: TimelineEvent, contentOrder: number, isToggle?: boolean}) => {
    const eventContentRef : RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector(selectLastAction)

    let isLoading = true
    if (lastAction === 'zoom' || lastAction === 'scroll') {setTimeout(() => {isLoading = false}, 500)}
    else {isLoading = false}

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

    return (
        <div ref={eventContentRef} className={`eventContent relative cursor-pointer`} style={{pointerEvents: !isToggle && contentOrder === 0 && event.overlap !== 0 ? 'auto' : 'none', top: top, left: left, height: 'fit-content', width: width, opacity: opacity, zIndex: zIndex}}>
            <Link href={`/events/${event.id}`} style={{pointerEvents: (!isToggle && ((contentOrder === 0 && event.overlap !== 0) || (contentOrder !== 0 && event.overlap === 0 ))) ? 'none' : 'auto'}}>
                <div className={`flex flex-col gap-1 bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5 min-h-[112px]`}>
                    <div className={'flex flex-col '}>
                        <div className={'text-xs font-semibold text-gray-500 line-clamp-1 text-ellipsis'}>{event.date}</div>
                        <div className={'mt-0.5 text-md font-bold'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.name}</div>
                    </div>
                    <div className={'text-sm whitespace-pre-wrap break-words line-clamp-3'} style={{transition: 'all 0.3s', opacity: !isToggle && contentOrder > 0 ? 0 : 1}}>{event.description}</div>
                </div>
            </Link>
        </div>
    )
}
export default EventContent