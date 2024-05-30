import React from "react";
import TimelineFrame from "@/components/timelines/timeline/timelineFrame";
import TimelineEvents from "@/components/timelines/timeline/timelineEvents";
import useOperateTimelineTest from "@/hooks/useOperateTimeline";
import TimelineModalEvent from "@/components/timelines/timelineModal/timelineModalEvent";
import TimelineModalInformation from "@/components/timelines/timelineModal/timelineModalInformation";

const Timeline = () => {
    useOperateTimelineTest()

    return (
        <div className='timeline relative w-full'>
            <TimelineFrame />
            <TimelineEvents />
            <TimelineModalInformation />
            <TimelineModalEvent />
        </div>
    )
}
export default Timeline