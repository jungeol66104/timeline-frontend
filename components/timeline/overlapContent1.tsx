import {TimelineEvent} from "@/public/events";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {stat} from "fs";

const OverlapContent1 = ({event} : {event: TimelineEvent}) => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrder].isToggle)

    const display = event.overlap !== 0 ? '' : 'hidden'
    return (
        <div className={`${display} absolute top-[24px] left-[28px] h-[100px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-10 transform transition-opacity ease-in-out duration-500 ${!isToggle ? 'opacity-100' : 'opacity-0'}`} style={{width: `calc(100% - 34px)`}}></div>
    )
}

export default OverlapContent1