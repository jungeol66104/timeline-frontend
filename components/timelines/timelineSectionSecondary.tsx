import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import AdsTimelineBetweenSecondary from "@/components/ads/adsTimelineBetweenSecondary";
import AdsTimelineSide from "@/components/ads/adsTimelineSide";
import TimelineListTemplate from "@/components/timelines/timelineListTemplate";

const TimelineSectionSecondary = () => {
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={`relative ml-[20px] max-[872px]:ml-0 p-4 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] ${!isBottomEnd && 'max-[852px]:hidden'} flex flex-col gap-4`}>
            <TimelineListTemplate title={'Popular'} timelines={popularTimelines} />
            <AdsTimelineBetweenSecondary />
            <TimelineListTemplate title={'Recently Added'} timelines={recentTimelines} />
            <AdsTimelineSide />
        </div>
    );
};

export default TimelineSectionSecondary;
