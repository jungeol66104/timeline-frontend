import {TimelineEvent} from "@/public/events";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateIsToggle} from "@/store/slices/eventsSlice";
import Image from "next/image";
import ExpandLessSVG from "@/public/svg/expandLess.svg";
import React from "react";

const EventListHeader = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch()

    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id)

    return (
        <div className={`pb-2.5 flex justify-between`}>
            <div className={'text-xl font-semibold'}>{event.date}</div>
            <div onClick={() => dispatch(updateIsToggle(eventOrder))} className={'cursor-pointer flex items-center text-[14px] font-medium'}><div>간략히 보기</div><div><Image src={ExpandLessSVG} alt={'toggle'} width={22} height={22} /></div></div>
        </div>

    )
}

export default EventListHeader