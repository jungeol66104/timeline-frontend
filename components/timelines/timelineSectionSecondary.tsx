import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import TimelineListTemplate from "@/components/timelines/timelineListTemplate";
import {useRouter} from "next/router";
import {getScrollWrapper} from "@/utils/global";
import AdsTimelineBetweenSecondary from "@/components/ads/adsTimelineBetweenSecondary";
import AdsTimelineSide from "@/components/ads/adsTimelineSide";

const TimelineSectionSecondary = () => {
    const router = useRouter();
    const isInformation = router.pathname.startsWith('/information')
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    // const isTopEnd = useSelector(selectIsTopEnd)
    // useEffect(() => {
    //     const scrollWrapper = getScrollWrapper()
    //     const secondaryWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.secondaryWrapper') : null
    //     if (!scrollWrapper || !secondaryWrapper) return
    //
    //     const handleScroll = () => {
    //         const scrollTop = scrollWrapper.scrollTop
    //         const scrollWrapperHeight = scrollWrapper.getBoundingClientRect().height
    //         const secondaryWrapperHeight = secondaryWrapper.getBoundingClientRect().height
    //
    //         if (window.innerWidth < 928) return
    //         if (scrollTop >= secondaryWrapperHeight - scrollWrapperHeight) {
    //             secondaryWrapper.style.transform = `translateY(-${secondaryWrapperHeight - scrollWrapperHeight}px)`
    //             secondaryWrapper.classList.remove("relative");
    //             secondaryWrapper.classList.add("fixed");
    //         } else {
    //             if (!isTopEnd) return
    //             secondaryWrapper.style.transform = ``
    //             secondaryWrapper.classList.remove("fixed");
    //             secondaryWrapper.classList.add("relative");
    //         }
    //     }
    //
    //     scrollWrapper.addEventListener('scroll', handleScroll)
    //     return () => {
    //         scrollWrapper.removeEventListener('scroll', handleScroll)
    //     }
    // });


    return (
        <div className={`relative ml-[20px] max-[872px]:ml-0 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] ${!isBottomEnd && 'max-[852px]:hidden'}`}>
            <div className={'secondaryWrapper relative p-4 max-[852px]:py-0 w-full h-fit min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px]'}>
                <hr className={`${isInformation && 'max-[852px]:hidden'}`}/>
                <TimelineListTemplate title={'Popular'} timelines={popularTimelines} />
                <hr/>
                <AdsTimelineBetweenSecondary />
                <hr/>
                <TimelineListTemplate title={'Recently Added'} timelines={recentTimelines} />
                <hr/>
                <AdsTimelineSide />
            </div>
        </div>
    );
};

export default TimelineSectionSecondary;
