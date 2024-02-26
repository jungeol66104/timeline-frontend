import {useSelector} from "react-redux";
import {TimelineEvent} from "@/store/slices/contentsSlice";
import EventBox from "@/components/timeline/eventBox";
import {selectCurrentEventsWithEffect} from "@/store/slices/contentsSlice";
import React from "react";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import TimelineEventsTop from "@/components/timeline/timelineEventsTop";
import TimelineEventsBottom from "@/components/timeline/timelineEventsBottom";
// refactoring: clear

const TimelineEvents = () => {
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    const testDescription = "Under the starlit sky, a solitary figure walks along the winding path, lost in contemplation of life's mysteries."
    const testEvent = {
        id: 217,
        date: "XXXX-XX-XX",
        name: "Test",
        description: testDescription,
        overlap: 0,
        isToggle: false,
        toggleEvents: [],
        ephemerisTime: 228830465,
        animation: "none"
    }

    return (
        <div className={'timelineEvents max-w-[650px] flex flex-col mx-4'} style={{width: `calc(100% - 32px)`}}>
            <TimelineEventsTop isEnd={isTopEnd} />
            {/*<EventBox event={testEvent} />*/}
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            <TimelineEventsBottom isEnd={isBottomEnd} />
        </div>
    )
}
export default TimelineEvents