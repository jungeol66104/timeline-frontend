import {useSelector} from "react-redux";
import {selectCurrentEvents, TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timeline/eventBox";
import React from "react";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import EventTop from "@/components/timeline/eventTop";
import EventBottom from "@/components/timeline/eventBottom";
// refactoring: clear

const TimelineEvents = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'timelineEvents relative flex flex-col w-full'}>
            <EventTop isEnd={isTopEnd}/>
            {currentEvents.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event}/>
            })}
            <EventBottom isEnd={isBottomEnd}/>
        </div>
    )
}
export default TimelineEvents