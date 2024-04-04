import {useEffect} from "react";
import {debounce, getScrollWrapper, sum} from "@/utils/global";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updatePivotEvent, updatePreviousEvents} from "@/store/slices/contentsSlice";
import {
    selectAboveTimelineHeight,
    selectCurrentDepth, selectIsBottomEnd,
    selectIsTopEnd,
    selectMaxDepth,
    selectTimelineEdgeHeight,
    updateCurrentDepth,
    updateIsBottomEnd,
    updateIsTopEnd,
    updateLastAction,
    updatePreviousTop
} from "@/store/slices/appearanceSlice";
import api from "@/utils/api";

const useOperateTimelineTest = () => {

    const dispatch = useDispatch()
    const aboveTimelineHeight = useSelector(selectAboveTimelineHeight)
    const timelineEdgeHeight = useSelector(selectTimelineEdgeHeight)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentDepth = useSelector(selectCurrentDepth)
    const maxDepth = useSelector(selectMaxDepth)
    const isTopEnd = useSelector(selectIsTopEnd)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const timeline: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timeline') : null
        const toolbarButtons: NodeListOf<HTMLButtonElement> | null = typeof window !== 'undefined' ? document.querySelectorAll('.toolbarButton') : null
        const eventBoxes = typeof window !== 'undefined' ? document.querySelectorAll('.eventBox') : null
        if (!scrollWrapper || !timeline || !toolbarButtons || !eventBoxes) return

        const getZoomTargetEvent = () => {
            let clientYInContainer =  scrollWrapper.scrollTop + scrollWrapper.clientHeight/2
            let eventBoxHeights = Array.from(eventBoxes).map(eventBox => eventBox.clientHeight)
            let eventBoxTops = eventBoxHeights.map((_, i) => sum(eventBoxHeights.slice(0,i)))
            let order = eventBoxTops.findLastIndex(top => top < clientYInContainer - timelineEdgeHeight)
            let top = eventBoxTops[order] + aboveTimelineHeight + timelineEdgeHeight - scrollWrapper.scrollTop
            let targetEvent = {...currentEvents[order], top: top}
            targetEvent = {...targetEvent, top: -1, ephemerisTime: "0"}
            return targetEvent
        }
        const getScrollTargetEvent = (scrollDirection: string) => {
            let eventBoxHeights = Array.from(eventBoxes).map(eventBox => eventBox.clientHeight)
            let eventBoxTops = eventBoxHeights.map((_, i) => sum(eventBoxHeights.slice(0,i)))
            let order = scrollDirection === 'down' ? currentEvents.length - 1 : 0
            let top = eventBoxTops[order] + aboveTimelineHeight + timelineEdgeHeight - scrollWrapper.scrollTop
            let targetEvent = {...currentEvents[order], top: top}
            if (scrollDirection === 'uppermost') targetEvent = {...targetEvent, top: -1, ephemerisTime: "0"}
            return targetEvent
        }
        const fetchEvents = async (depth: number, targetEvent: TimelineEvent) => {
            try {
                const response = await api.get(`/timeline/${currentTimeline.id}?depth=${depth}&time=${targetEvent.ephemerisTime}`, {headers: {lang: 'en'}})
                let fetchedEvents = response.data.data.events as TimelineEvent[]
                let pivotEvent = fetchedEvents.find(fEvent => fEvent.id === response.data.data.pivotEventId) as TimelineEvent
                const isTopEnd = response.data.data.isTopEnd
                const isBottomEnd = response.data.data.isBottomEnd
                return {fetchedEvents, pivotEvent, isTopEnd, isBottomEnd}
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error)
                return {fetchedEvents: currentEvents, pivotEvent: targetEvent}
            }
        }
        const operateZoom = (classNames: DOMTokenList) => {
            const depth = classNames.contains('showAll') ? maxDepth : 0
            let targetEvent = getZoomTargetEvent()
            // if (depth < 1) targetEvent = {...targetEvent, ephemerisTime: "0"}

            fetchEvents(depth, targetEvent).then(({fetchedEvents, pivotEvent, isTopEnd, isBottomEnd}) => {
                dispatch(updatePreviousTop(targetEvent.top))
                dispatch(updatePivotEvent(pivotEvent))
                dispatch(updatePreviousEvents(currentEvents))
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateIsTopEnd(isTopEnd))
                dispatch(updateIsBottomEnd(isBottomEnd))
                dispatch(updateLastAction('zoom'))
                dispatch(updateCurrentDepth(depth))
            })
        }
        const operateScroll = (scrollDirection: string) => {
            if (scrollDirection === 'up' && isTopEnd) return
            if (scrollDirection === 'down' && isBottomEnd) return
            let targetEvent = getScrollTargetEvent(scrollDirection)

            fetchEvents(currentDepth, targetEvent).then(({fetchedEvents, pivotEvent, isTopEnd, isBottomEnd}) => {
                let previousTop = isTopEnd ? targetEvent.top - 250 : targetEvent.top

                dispatch(updatePreviousTop(previousTop))
                dispatch(updatePivotEvent(pivotEvent))
                dispatch(updatePreviousEvents(currentEvents))
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateIsTopEnd(isTopEnd))
                dispatch(updateIsBottomEnd(isBottomEnd))
                dispatch(updateLastAction('scroll'))
            })
        }
        const handleClick = async (e: MouseEvent) => {
            const toolbarButton = e.currentTarget as HTMLButtonElement
            const classNames = toolbarButton.classList
            if (classNames.contains('uppermost')) {
                operateScroll('uppermost')
            } else {
                operateZoom(classNames)
            }
        }
        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let scrollDirection = scrollWrapper.scrollTop < 150 ? 'up' : scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 150 ? 'down' : null
            if (scrollDirection) operateScroll(scrollDirection)
        }

        toolbarButtons?.forEach(toolbarButton => toolbarButton.addEventListener('click', handleClick))
        scrollWrapper.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            toolbarButtons?.forEach(toolbarButton => toolbarButton.removeEventListener('click', handleClick))
            scrollWrapper.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
};

export default useOperateTimelineTest
