import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/rootReducer";
import {updateIsToggle, updateLastAction, updateToggleEvents, updateTotalHeight} from "@/store/slices/eventsSlice";
import Image from "next/image";
import ExpandLessSVG from "@/public/svg/expandLess.svg";
import React, {useEffect, useRef} from "react";
import gsap from "gsap";

const EventListHeader = ({event} : {event: TimelineEvent}) => {

    const dispatch = useDispatch()
    const currentEvents = useSelector((state: RootState) => state.events.currentEvents)
    const totalHeight = useSelector((state: RootState) => state.events.totalHeight)
    const eventOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const toggleEvents = useSelector((state: RootState) => state.events.currentEvents[eventOrder].toggleEvents)
    const isToggle = useSelector((state: RootState) => state.events.currentEvents[eventOrder].isToggle)

    const handleClick = () => {
        const newTotalHeight = totalHeight + (124 + event.overlap * 6) - (38 + (toggleEvents.length + 1) * 124)
        dispatch(updateIsToggle(eventOrder))
        dispatch(updateLastAction('toggle'))
        dispatch(updateTotalHeight(newTotalHeight))
    }

    let top = isToggle ? 0 : 38

    return (
        <div className={`absolute w-full`} style={{transition: 'all 0.5s', top: top}}>
            <div className={`pb-2.5 flex justify-between`}>
                <div className={'text-xl font-semibold'}>{event.date}</div>
                <div onClick={handleClick} className={'cursor-pointer pt-[1px] flex items-center text-[14px] font-medium'}><div>간략히 보기</div><div><Image src={ExpandLessSVG} alt={'toggle'} width={22} height={22} /></div></div>
            </div>
        </div>

    )
}

export default EventListHeader