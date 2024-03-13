import React, {useLayoutEffect} from "react";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
import useScrollSetup from "@/hooks/useScrollSetup";
import {useSelector} from "react-redux";
import {selectTotalHeight} from "@/store/slices/appearanceSlice";
import Toolbar from "@/components/timeline/toolbar";
import useOperateTimelineTest from "@/hooks/useOperateTimelineTest";
import useScrollSetupTest from "@/hooks/useScrollSetupTest";
// refactoring: clear

const Timeline = () => {

    // useScrollSetup()
    // useOperateTimeline()
    useScrollSetupTest()
    useOperateTimelineTest()

    return (
        <div className='timeline relative w-full max-w-[670px]'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline