import React from "react";
import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import useOperateTimelineTest from "@/hooks/useOperateTimelineTest";
// refactoring: clear

const Timeline = () => {
    useOperateTimelineTest()

    return (
        <div className='timeline relative w-full'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline