import React from "react";
import {useSelector} from "react-redux";
import {selectCurrentEvents, TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timelines/timeline/eventBox";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import TimelineTop from "@/components/timelines/timeline/timelineTop";
import TimelineBottom from "@/components/timelines/timeline/timelineBottom";

const TimelineEvents = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'timelineEvents relative flex flex-col w-full'}>
            <TimelineTop />
            {currentEvents.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event}/>
            })}
            <TimelineBottom isEnd={isBottomEnd}/>
        </div>
    )
}
export default TimelineEvents