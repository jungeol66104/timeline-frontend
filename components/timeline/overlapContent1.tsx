import {TimelineEvent} from "@/public/events";
import React from "react";

const OverlapContent1 = ({event} : {event: TimelineEvent}) => {
    const display = event.overlap !== 0 ? '' : 'hidden'
    return (
        <div className={`${display} absolute top-[24px] left-[28px] h-[100px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-10`} style={{width: `calc(100% - 34px)`}}></div>
    )
}

export default OverlapContent1