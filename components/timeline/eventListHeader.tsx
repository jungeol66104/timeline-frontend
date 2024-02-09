import {TimelineEvent} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, updateIsToggle} from "@/store/slices/contentsSlice";
import Image from "next/image";
import ExpandLessSVG from "@/public/svg/expandLess.svg";
import {selectLastAction, selectTotalHeight, updateLastAction, updateTotalHeight} from "@/store/slices/appearanceSlice";
import {RefObject, useEffect, useRef} from "react";
import {getClickOrTouch} from "@/utils/global";
// refactoring: clear

const EventListHeader = ({event} : {event: TimelineEvent}) => {
    const untoggleButtonRef : RefObject<HTMLDivElement> = useRef(null)

    const dispatch = useDispatch()
    const totalHeight = useSelector(selectTotalHeight)
    const currentEvents = useSelector(selectCurrentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = currentEvents[eventOrderInCurrent].isToggle
    const toggleEvents = currentEvents[eventOrderInCurrent].toggleEvents
    const lastAction = useSelector(selectLastAction)


    // event handler for toggle
    useEffect(() => {
        const untoggleButton = untoggleButtonRef.current
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!untoggleButton || !scrollWrapper) return

        // mobile detection
        let clickOrTouchend = getClickOrTouch()

        // disable handleClick when it is swipe motion
        let isSwipe = false

        const handleClick = () => {
            if (isSwipe) return
            if (!toggleEvents) return
            const newTotalHeight = totalHeight + (124 + (event.overlap as number) * 6) - (38 + (toggleEvents.length + 1) * 124)
            dispatch(updateIsToggle(eventOrderInCurrent))
            dispatch(updateTotalHeight(newTotalHeight))
            dispatch(updateLastAction('toggle'))
        }

        untoggleButton.addEventListener(clickOrTouchend, handleClick)
        scrollWrapper.addEventListener('touchmove', () => isSwipe = true)
        scrollWrapper.addEventListener('touchend', () => isSwipe = false)
        return () => {
            untoggleButton.removeEventListener(clickOrTouchend, handleClick)
            scrollWrapper.removeEventListener('touchmove', () => isSwipe = true)
            scrollWrapper.removeEventListener('touchend', () => isSwipe = false)
        }
    });

    let top = isToggle ? 0 : 38
    const transition = lastAction === 'toggle' ? 'all 0.5s' : 'all 0s'

    return (
        <div className={`absolute w-full`} style={{ transition: transition, top: top}}>
            <div className={`pb-2.5 flex justify-between`}>
                <div className={'text-xl font-semibold'}>{event.date}</div>
                <div ref={untoggleButtonRef} className={'cursor-pointer pt-[1px] flex items-center text-[14px] font-medium'}>
                    <div className={'line-clamp-1 overflow-hidden'}>Show Less</div>
                    <div><Image src={ExpandLessSVG} alt={'toggle'} width={22} height={22} /></div>
                </div>
            </div>
        </div>

    )
}
export default EventListHeader