import React from "react";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import useScrollSetup from "@/hooks/useScrollSetup";
// refactoring: clear

const Timeline = () => {
    useScrollSetup()
    useOperateTimeline()

    return (
        <div className='timeline relative h-fit w-full max-w-[670px]'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline