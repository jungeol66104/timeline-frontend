import React from "react";
import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimelineTest from "@/hooks/useOperateTimeline";
import TimelineModalEvent from "@/components/timelines/timelineModal/timelineModalEvent";

const Timeline = () => {
    useOperateTimelineTest()

    return (
        <div className='timeline relative w-full'>
            <TimelineFrame />
            <TimelineEvents />
            <TimelineModalEvent />
        </div>
    )
}
export default Timeline