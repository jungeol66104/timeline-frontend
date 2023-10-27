import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateIsToggle, updateLastAction, updateTotalHeight} from "@/store/slices/eventsSlice";
import Image from "next/image";
import ExpandLessSVG from "@/public/svg/expandLess.svg";
import React from "react";

const AfterEventListHeader = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch()

    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const totalHeight = useSelector((state: RootState) => state.reducer.events.totalHeight)
    const eventOrder = prevEventsWithEffect.findIndex(cEvent => cEvent.id === event.id)
    const toggleEvents = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect[eventOrder].toggleEvents)

    const handleClick = () => {
        const newTotalHeight = totalHeight + (124 + event.overlap * 6) - (38 + (toggleEvents.length + 1) * 124)
        dispatch(updateIsToggle(eventOrder))
        dispatch(updateLastAction('toggle'))
        dispatch(updateTotalHeight(newTotalHeight))
    }

    return (
        <div className={`pb-2.5 flex justify-between`}>
            <div className={'text-xl font-semibold'}>{event.date}</div>
            <div onClick={handleClick} className={'cursor-pointer pt-[1px] flex items-center text-[14px] font-medium'}><div>간략히 보기</div><div><Image src={ExpandLessSVG} alt={'toggle'} width={22} height={22} /></div></div>
        </div>

    )
}

export default AfterEventListHeader