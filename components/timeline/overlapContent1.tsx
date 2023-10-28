import {TimelineEvent} from "@/public/events";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {stat} from "fs";

const OverlapContent1 = ({event} : {event: TimelineEvent}) => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = !event.prev ? useSelector((state: RootState) => state.reducer.events.currentEvents[eventOrderInCurrent].isToggle) : useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect[eventOrderInPrev].isToggle)

    const display = event.overlap !== 0 ? '' : 'hidden'
    return (
        <div className={`${display} absolute top-[18px] left-[6px] h-[100px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-10 transform transition-opacity ease-in-out duration-500 ${!isToggle ? 'opacity-100' : 'opacity-0'}`} style={{width: `calc(100% - 12px)`}}></div>
    )
}

export default OverlapContent1