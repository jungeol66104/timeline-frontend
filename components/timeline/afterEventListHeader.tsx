import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateIsToggle, updateLastAction, updateTotalHeight} from "@/store/slices/eventsSlice";
import Image from "next/image";
import ExpandLessSVG from "@/public/svg/expandLess.svg";
import React, {useRef} from "react";

const AfterEventListHeader = ({event} : {event: TimelineEvent}) => {

    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const eventOrder = prevEventsWithEffect.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect[eventOrder].isToggle)

    let top = isToggle ? 0 : 38

    return (
        <div className={`absolute w-full`} style={{transition: 'all 0.5s', top: top}}>
            <div className={`pb-2.5 flex justify-between`}>
                <div className={'text-xl font-semibold'}>{event.date}</div>
                <div className={'cursor-pointer pt-[1px] flex items-center text-[14px] font-medium'}><div>간략히 보기</div><div><Image src={ExpandLessSVG} alt={'toggle'} width={22} height={22} /></div></div>
            </div>
        </div>

    )
}

export default AfterEventListHeader