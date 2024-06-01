import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import TimelineListTemplate from "@/components/timelines/timelineListTemplate";
import {useRouter} from "next/router";

const InformationSectionSecondary = () => {
    const router = useRouter();
    const isInformation = router.pathname.startsWith('/information')
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={`relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] ${!isBottomEnd && 'max-[852px]:hidden'}`}>
            <hr className={`${isInformation && 'max-[852px]:hidden'}`}/>
            <TimelineListTemplate title={'Popular'} timelines={popularTimelines} />
            <hr/>
            <TimelineListTemplate title={'Recently Added'} timelines={recentTimelines} />
            <hr/>
        </div>
    );
};

export default InformationSectionSecondary;
