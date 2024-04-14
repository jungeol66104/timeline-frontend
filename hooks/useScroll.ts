import {useEffect, useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {selectLastAction, selectPreviousTop, selectScrollTop} from "@/store/slices/appearanceSlice";
import {getScrollWrapper, getFirstEventBox, sum, getTimeline} from "@/utils/global";
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
    const pivotEvent = useSelector(selectPivotEvent) || {id: 0}
    const previousTop = useSelector(selectPreviousTop)
    const lastAction = useSelector(selectLastAction)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const eventBoxes = typeof window !== 'undefined' ? document.querySelectorAll('.eventBox') : null
        if (!scrollWrapper || !eventBoxes) return

        if (lastAction === 'scroll' && previousTop !== -99999) {
            let eventBoxHeights = Array.from(eventBoxes).map(eventBox => eventBox.clientHeight)
            let eventBoxTops = eventBoxHeights.map((_, i) => sum(eventBoxHeights.slice(0,i)))
            let order = currentEvents.findIndex(cEvent => cEvent.id === pivotEvent.id)
            let timelineOffsetTop = getTimeline()?.offsetTop as number
            let firstEventBoxOffsetTop = getFirstEventBox()?.offsetTop as number
            let newScrollTop = eventBoxTops[order] + firstEventBoxOffsetTop + timelineOffsetTop - previousTop
            scrollWrapper.style.overflowY = 'hidden'
            scrollWrapper.scrollTop = newScrollTop
            scrollWrapper.style.overflowY = 'scroll'
        } else if (lastAction === 'zoom' || previousTop === -99999){
            scrollWrapper.style.overflowY = 'hidden'
            scrollWrapper.scrollTop = 0
            scrollWrapper.style.overflowY = 'scroll'
        }
    }, [pivotEvent, previousTop, lastAction, currentEvents])
}