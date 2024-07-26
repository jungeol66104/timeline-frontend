import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import TimelineListTemplate from "@/_deprecated/timelineListTemplate";
import {useRouter} from "next/router";
import AdsTimelineBetweenSecondary from "@/components/ads/adsTimelineBetweenSecondary";
import AdsTimelineSide from "@/components/ads/adsTimelineSide";
import TimelineListTemplateTest from "@/components/timelines/timelineListTemplateTest";

const TimelineSectionSecondary = () => {
    const router = useRouter();
    const isInformation = router.pathname.startsWith('/information')
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={`relative ml-[20px] max-[872px]:ml-0 p-4 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] ${!isBottomEnd && 'max-[852px]:hidden'} flex flex-col gap-4`}>
            <TimelineListTemplateTest title={'Popular'} timelines={popularTimelines} />
            <AdsTimelineBetweenSecondary />
            <TimelineListTemplateTest title={'Recently Added'} timelines={recentTimelines} />
            <AdsTimelineSide />
        </div>
    );
};

export default TimelineSectionSecondary;
