import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {selectScrollTop, selectTotalHeight} from "@/store/slices/appearanceSlice";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import useOperateTimeline from "@/hooks/useOperateTimeline";
// refactoring: clear

const Timeline = () => {
    const scrollTop = useSelector(selectScrollTop)
    const totalHeight = useSelector(selectTotalHeight)

    // scroll setup
    useEffect(() => {
        const scrollWrapper: HTMLElement | null = typeof window !== 'undefined' ? document.documentElement : null
        if (!scrollWrapper) return
        // trick for stopping momentum scroll error in webkit based browsers
        scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        scrollWrapper.style.overflowY = 'auto'
    },[scrollTop])

    useOperateTimeline()

    return (
        <div className='timeline relative h-fit w-full max-w-[670px]'>
            <TimelineFrame />
            <TimelineEvents />
        </div>
    )
}
export default Timeline