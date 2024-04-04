import {useEffect, useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAboveTimelineHeight, selectIsTopEnd, selectLastAction, selectPreviousTop, selectScrollTop, selectTimelineEdgeHeight} from "@/store/slices/appearanceSlice";
import {getScrollWrapper, sum} from "@/utils/global";
import {selectCurrentEvents, selectPivotEvent} from "@/store/slices/contentsSlice";

export const useScroll = () => {
    const scrollTop = useSelector(selectScrollTop)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return
        // trick for stopping momentum scroll error in webkit based browsers
        scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        scrollWrapper.style.overflowY = 'scroll'
    });
}

export const useScrollForTimeline = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    const pivotEvent = useSelector(selectPivotEvent)
    const previousTop = useSelector(selectPreviousTop)
    const lastAction = useSelector(selectLastAction)
    const isTopEnd = useSelector(selectIsTopEnd)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const eventBoxes = typeof window !== 'undefined' ? document.querySelectorAll('.eventBox') : null
        if (!scrollWrapper || !eventBoxes) return

        if (lastAction === 'scroll' && previousTop > -1) {
            let eventBoxHeights = Array.from(eventBoxes).map(eventBox => eventBox.clientHeight)
            let eventBoxTops = eventBoxHeights.map((_, i) => sum(eventBoxHeights.slice(0,i)))
            let order = currentEvents.findIndex(cEvent => cEvent.id === pivotEvent.id)
            scrollWrapper.style.overflowY = 'hidden'
            scrollWrapper.scrollTop = isTopEnd ? eventBoxTops[order] + 252 - previousTop : eventBoxTops[order] + 60 - previousTop
            scrollWrapper.style.overflowY = 'scroll'
        } else if (lastAction === 'zoom' || previousTop === -1) {
            scrollWrapper.style.overflowY = 'hidden'
            scrollWrapper.scrollTop = 0
            scrollWrapper.style.overflowY = 'scroll'
        }
    }, [pivotEvent])
}