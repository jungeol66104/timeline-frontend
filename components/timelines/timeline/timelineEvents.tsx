import React from "react";
import {useSelector} from "react-redux";
import {selectIsBottomEnd, selectTimelineContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, selectCurrentEventsDraft, TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timelines/timeline/eventBox";
import TimelineTop from "@/components/timelines/timeline/timelineTop";
import TimelineBottom from "@/components/timelines/timeline/timelineBottom";

const TimelineEvents = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)
    const timelineContentType = useSelector(selectTimelineContentType)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    const events = timelineContentType === 'edit' || timelineContentType === 'new' ? currentEventsDraft : currentEvents
    return (
        <div className={'timelineEvents relative flex flex-col w-full'}>
            <TimelineTop />
            {events.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event}/>
            })}
            <TimelineBottom isEnd={isBottomEnd}/>
        </div>
    )
}

export default TimelineEvents;
