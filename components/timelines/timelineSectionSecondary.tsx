import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd, selectIsTopEnd} from "@/store/slices/appearanceSlice";
import {selectPopularTimelines, selectRecentTimelines} from "@/store/slices/contentsSlice";
import TimelineListTemplate from "@/components/timelines/timelineListTemplate";
import {useRouter} from "next/router";
import {getScrollWrapper} from "@/utils/global";

const TimelineSectionSecondary = () => {
    const router = useRouter();
    const isInformation = router.pathname.startsWith('/information')
    const popularTimelines = useSelector(selectPopularTimelines)
    const recentTimelines = useSelector(selectRecentTimelines).slice(0,5)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const secondaryWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.secondaryWrapper') : null
        if (!scrollWrapper || !secondaryWrapper) return

        const handleScroll = () => {
            const scrollTop = scrollWrapper.scrollTop
            const scrollWrapperHeight = scrollWrapper.getBoundingClientRect().height
            const secondaryWrapperHeight = secondaryWrapper.getBoundingClientRect().height

            if (window.innerWidth < 928) return
            if (scrollTop >= secondaryWrapperHeight - scrollWrapperHeight) {
                secondaryWrapper.style.transform = `translateY(-${secondaryWrapperHeight - scrollWrapperHeight}px)`
                secondaryWrapper.classList.remove("relative");
                secondaryWrapper.classList.add("fixed");
            } else {
                if (!isTopEnd) return
                secondaryWrapper.style.transform = ``
                secondaryWrapper.classList.remove("fixed");
                secondaryWrapper.classList.add("relative");
            }
        }

        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            scrollWrapper.removeEventListener('scroll', handleScroll)
        }
    });


    return (
        <div className={`relative w-full min-w-[300px] max-w-[350px] max-[928px]:max-w-[600px] ${!isBottomEnd && 'max-[928px]:hidden'} ml-2 max-[928px]:ml-0`}>
            <div className={'secondaryWrapper relative w-full h-fit min-w-[300px] max-w-[350px] p-4 max-[928px]:max-w-[600px] max-[928px]:py-0'}>
                <hr className={`${isInformation && 'max-[928px]:hidden'}`}/>
                <TimelineListTemplate title={'Popular'} timelines={popularTimelines} />
                <hr/>
                <TimelineListTemplate title={'Recently Added'} timelines={recentTimelines} />
                <hr/>
            </div>
        </div>
    );
};

export default TimelineSectionSecondary;
