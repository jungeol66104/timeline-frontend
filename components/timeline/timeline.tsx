import React from "react";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import useScrollSetup from "@/hooks/useScrollSetup";
import {useSelector} from "react-redux";
import {selectTotalHeight} from "@/store/slices/appearanceSlice";
// refactoring: clear

const Timeline = () => {
    const totalHeight = useSelector(selectTotalHeight)

    useScrollSetup()
    useOperateTimeline()

    return (
        <div className='timeline absolute h-fit w-full max-w-[670px]' style={{height: totalHeight + 140}}>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline