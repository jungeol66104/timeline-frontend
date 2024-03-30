import React from "react";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
// refactoring: clear

const Timeline = () => {
    useOperateTimeline()

    return (
        <div className='timeline relative w-full max-w-[670px]'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline