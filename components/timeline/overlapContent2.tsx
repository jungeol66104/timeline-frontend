import {TimelineEvent} from "@/public/events";
import React from "react";

const OverlapContent2 = ({event} : {event: TimelineEvent}) => {
    const display = event.overlap === 2 ? '' : 'hidden'
    return (
        <div className={`${display} flex-shrink-0 absolute top-[42px] left-[34px] h-[88px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-20`} style={{width: `calc(100% - 46px)`}}></div>
    )
}

export default OverlapContent2