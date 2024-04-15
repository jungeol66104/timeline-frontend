import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import TimelineListTemplate from "@/components/timelines/timelineListTemplate";
import {useRouter} from "next/router";

const TimelineSectionSecondary = () => {
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isBottomEnd = useSelector(selectIsBottomEnd)
    const router = useRouter();
    const isInformation = router.pathname.startsWith('/information')

    return (
        <div className={`w-full min-w-[300px] max-w-[350px] ml-2 p-4 max-[928px]:max-w-[600px] max-[928px]:ml-0 max-[928px]:py-0 ${!isBottomEnd && 'max-[928px]:hidden'}`}>
            <hr className={`${isInformation && 'max-[928px]:hidden'}`}/>
            <TimelineListTemplate title={'Popular'} timelines={popularTimelines} />
            <hr/>
            <TimelineListTemplate title={'Recently Added'} timelines={recentTimelines} />
            <hr/>
        </div>
    );
};

export default TimelineSectionSecondary;
