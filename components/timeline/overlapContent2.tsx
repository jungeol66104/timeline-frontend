import {TimelineEvent} from "@/public/events";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/rootReducer";

const OverlapContent2 = ({event} : {event: TimelineEvent}) => {
    const currentEvents = useSelector((state: RootState) => state.events.currentEvents)
    const eventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === event.id)
    const prevEventsWithEffect = useSelector((state: RootState) => state.events.prevEventsWithEffect)
    const eventOrderInPrev = prevEventsWithEffect.findIndex(pEvent => pEvent.id === event.id)
    const isToggle = !event.prev ? useSelector((state: RootState) => state.events.currentEvents[eventOrderInCurrent].isToggle) : useSelector((state: RootState) => state.events.prevEventsWithEffect[eventOrderInPrev].isToggle)

    const display = event.overlap === 2 ? '' : 'hidden'
    return (
        <div className={`${display} flex-shrink-0 absolute top-[36px] left-[12px] h-[88px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-20 transform transition-opacity ease-in-out duration-500 ${!isToggle ? 'opacity-100' : 'opacity-0'}`} style={{width: `calc(100% - 24px)`}}></div>
    )
}

export default OverlapContent2