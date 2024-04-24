import React from "react";
import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
// refactoring: clear

const Timeline = () => {
    useOperateTimeline()

    return (
        <div className='timeline relative w-full'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline