import {useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {selectAboveTimelineHeight, selectPreviousTop, selectTimelineEdgeHeight} from "@/store/slices/appearanceSlice";
import {getScrollWrapper, sum} from "@/utils/global";
import {selectCurrentEvents, selectPivotEvent} from "@/store/slices/contentsSlice";

const useScrollSetupTest = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    let pivotEvent = useSelector(selectPivotEvent)
    const previousTop = useSelector(selectPreviousTop)
    const aboveTimelineHeight = useSelector(selectAboveTimelineHeight)
    const timelineEdgeHeight = useSelector(selectTimelineEdgeHeight)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const eventBoxes = typeof window !== 'undefined' ? document.querySelectorAll('.eventBox') : null
        if (!scrollWrapper || !eventBoxes) return

        let scrollTop = 0
        if (previousTop > -1) {
            let eventBoxHeights = Array.from(eventBoxes).map(eventBox => eventBox.clientHeight)
            let eventBoxTops = eventBoxHeights.map((_, i) => sum(eventBoxHeights.slice(0,i)))
            let order = currentEvents.findIndex(cEvent => cEvent.id === pivotEvent.id)
            scrollTop = eventBoxTops[order] + aboveTimelineHeight + timelineEdgeHeight - previousTop
        }
        // trick for stopping momentum scroll error in webkit based browsers
        scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        scrollWrapper.style.overflowY = 'scroll'
    }, [pivotEvent])
}

export default useScrollSetupTest;
