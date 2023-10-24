import {TimelineEvent} from "@/public/events";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {updateIsToggle} from "@/store/slices/eventsSlice";
import React from "react";

const EventContent = ({event, eventOrder, isToggle} : {event: TimelineEvent, eventOrder?: number, isToggle?: boolean}) => {
    const router = useRouter()
    const dispatch = useDispatch()

    const handleClick = () => {
        if(event.overlap === 0 || isToggle) router.push(`/events/${event.id}`)
        else dispatch(updateIsToggle(eventOrder))
    }

    return (
        <div onClick={handleClick} className={"cursor-pointer w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5"}>
            <div className={'flex gap-2.5'}>
                <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
                <div className={'text-[12px] text-gray-500 line-clamp-1 overflow-hidden'}>#전쟁</div>
            </div>
            <div className={'mt-0.5 font-black'}>{event.title}</div>
            <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'}>{event.content}</div>
        </div>
    )
}

export default EventContent