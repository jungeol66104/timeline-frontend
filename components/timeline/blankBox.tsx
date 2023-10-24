import {TimelineEvent} from "@/public/events";
import React from "react";

const BlankBox = ({event}:{event:TimelineEvent}) => {
    let paddingBottom = event.overlap === 0 ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'
    return <div className={`pt-[6px] ${paddingBottom}`} style={{transform:'translate(0,-0)'}}><div className={'h-28'}></div></div>
}

export default BlankBox