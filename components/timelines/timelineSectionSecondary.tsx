import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import AdsTimelineBetweenSecondary from "@/components/ads/adsTimelineBetweenSecondary";
import AdsTimelineSide from "@/components/ads/adsTimelineSide";
import TimelinesPreview from "@/components/timelines/timelinesPreview";

const TimelineSectionSecondary = () => {
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isBottomEnd = useSelector(selectIsBottomEnd)
    const timelineType = useSelector(selectTimelineType)

    return (
        <div className={`${timelineType === 'private' && 'invisible max-[852px]:hidden'} ${!isBottomEnd && 'max-[852px]:hidden'} relative ml-[20px] max-[872px]:ml-0 p-3 max-[630px]:pt-0 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] flex flex-col gap-4`}>
            <TimelinesPreview title={'Popular'} timelines={popularTimelines} />
            <AdsTimelineBetweenSecondary />
            <TimelinesPreview title={'Recently Added'} timelines={recentTimelines} />
            <AdsTimelineSide />
        </div>
    );
};

export default TimelineSectionSecondary;
