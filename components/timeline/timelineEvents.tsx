import {useSelector} from "react-redux";
import {selectCurrentEvents, TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
import React from "react";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import TimelineTop from "@/components/timeline/timelineTop";
import TimelineBottom from "@/components/timeline/timelineBottom";
import Toolbar from "@/components/timeline/toolbar";
// refactoring: clear

const TimelineEvents = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'timelineEvents relative flex flex-col mx-4 max-w-[650px]'} style={{width: `calc(100% - 32px)`}}>
            <TimelineTop isEnd={isTopEnd} />
            {currentEvents.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            <TimelineBottom isEnd={isBottomEnd} />
        </div>
    )
}
export default TimelineEvents