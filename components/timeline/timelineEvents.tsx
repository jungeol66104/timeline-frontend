import {useSelector} from "react-redux";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
import React from "react";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import TimelineTop from "@/components/timeline/timelineTop";
import TimelineBottom from "@/components/timeline/timelineBottom";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'timelineEvents max-w-[650px] flex flex-col mx-4'} style={{width: `calc(100% - 32px)`}}>
            <TimelineTop isEnd={isTopEnd} />
            {/*<EventBox event={testEvent} />*/}
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            <TimelineBottom isEnd={isBottomEnd} />
        </div>
    )
}
export default TimelineEvents