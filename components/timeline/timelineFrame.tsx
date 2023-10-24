import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {TimelineEvent} from "@/public/events";
import {sum} from "@/utils/global";
import React from "react";

const TimelineFrame = () => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventBoxHeight = 124
    const overlapBottom = 6
    const arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * overlapBottom)
    const totalHeight = sum(arrayOfHeight)

    return <div className={`w-3 h-[10px] relative animate-fadeIn`}><div className={`absolute w-0.5 bg-gray-600 left-1/2`} style={{height: `${totalHeight + 20}px`, transform:'translate(-50%,-0)'}}></div></div>
}

export default TimelineFrame