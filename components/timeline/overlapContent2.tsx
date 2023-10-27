import {TimelineEvent} from "@/public/events";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const OverlapContent2 = ({event} : {event: TimelineEvent}) => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const isToggle = useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrder].isToggle)

    const display = event.overlap === 2 ? '' : 'hidden'
    return (
        <div className={`${display} flex-shrink-0 absolute top-[42px] left-[34px] h-[88px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-20 transform transition-opacity ease-in-out duration-500 ${!isToggle ? 'opacity-100' : 'opacity-0'}`} style={{width: `calc(100% - 46px)`}}></div>
    )
}

export default OverlapContent2