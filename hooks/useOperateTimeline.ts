import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "@/utils/api";
import {debounce, getEventHeights, getScrollWrapper, sum} from "@/utils/global";
import {selectCurrentEvents, selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect} from "@/store/slices/contentsSlice";
import {selectAboveTimelineHeight, selectCurrentDepth, selectEventBoxHeight, selectLastAction, selectMaxDepth, selectOverlapBottom, selectTimelineEdgeHeight, updateAfterEffectTop, updateCurrentDepth, updateIsBottomEnd, updateIsTopEnd, updateLastAction, updateScrollTop, updateTotalHeight} from "@/store/slices/appearanceSlice";

const useOperateTimeline = () => {
    const dispatch = useDispatch()
    // global vars
    const aboveTimelineHeight = useSelector(selectAboveTimelineHeight)
    const eventBoxHeight = useSelector(selectEventBoxHeight)
    const overlapBottom = useSelector(selectOverlapBottom)
    const timelineEdgeHeight = useSelector(selectTimelineEdgeHeight)
    // effects
    const currentDepth = useSelector(selectCurrentDepth)
    const maxDepth = useSelector(selectMaxDepth)
    const lastAction = useSelector(selectLastAction)
    // contents
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)

    // suppress additional actions after zoom or scroll
    let isLoading = true
    if (lastAction === 'zoom' || lastAction === 'scroll') {setTimeout(() => {isLoading = false}, 500)}
    else {isLoading = false}

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const timeline: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timeline') : null
        const toolbarButtons: NodeListOf<HTMLButtonElement> | null = typeof window !== 'undefined' ? document.querySelectorAll('.toolbarButton') : null
        if (!scrollWrapper || !timeline || !toolbarButtons) return

        const currentEventHeights = getEventHeights(currentEvents)
        let currentEventTops = currentEventHeights.map((_, i) => sum(currentEventHeights.slice(0,i)))
        // initial setting for calculating user swipe action
        let startX: number | null = null
        let startY: number | null = null

        // functions
        const getSwipedEvent = (e?: WheelEvent | TouchEvent | MouseEvent) : TimelineEvent => {
            let clientYInContainer = 0
            if (e instanceof TouchEvent) clientYInContainer = scrollWrapper.scrollTop + e.changedTouches[0].clientY - aboveTimelineHeight - timelineEdgeHeight
            else if (e instanceof WheelEvent || e instanceof MouseEvent) clientYInContainer = scrollWrapper.scrollTop + e.clientY  - aboveTimelineHeight - timelineEdgeHeight
            else clientYInContainer = scrollWrapper.scrollTop + scrollWrapper.clientHeight/2
            let order = 0
            if (clientYInContainer > 0) order = currentEventTops.findLastIndex(top => top < clientYInContainer)
            let top = currentEventTops[order] + aboveTimelineHeight + timelineEdgeHeight - scrollWrapper.scrollTop
            let boxTop = top
            if (currentEvents[order].isToggle) {
                let clientYInBox = clientYInContainer - currentEventTops[order]
                let orderInBox = 0
                if (clientYInBox > 38) {orderInBox = Math.floor((clientYInBox - 38) / 124)}
                boxTop = 38 + orderInBox * 124
            }
            return {...currentEvents[order], order: order, top: top, boxTop: boxTop}
        }
        const fetchEvents = async (depth: number, pivotEvent: TimelineEvent) => {
            if (depth === maxDepth + 1 || depth === -1) return {fetchedEvents: currentEvents, referEvent: pivotEvent}
            try {
                const response = await api.get(`/timeline/${currentTimeline.id}?depth=${depth}&time=${pivotEvent.ephemerisTime}`, {headers: {lang: 'en'}})
                let fetchedEvents = response.data.data.events as TimelineEvent[]
                fetchedEvents = fetchedEvents.map(fEvent => {
                    return {...fEvent, isToggle: false, toggleEvents: []}
                })
                fetchedEvents = fetchedEvents.map(fEvent => {
                    const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                    if (cEvent) return cEvent
                    else return fEvent
                })
                const referEvent = fetchedEvents.find(fEvent => fEvent.id === response.data.data.pivotEventId) as TimelineEvent
                const isTopEnd = response.data.data.isTopEnd
                const isBottomEnd = response.data.data.isBottomEnd
                return {fetchedEvents, referEvent, isTopEnd, isBottomEnd}
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error);
                return {fetchedEvents: currentEvents, referEvent: pivotEvent}
            }
        }
        const getEventsWithEffectForZoom = (depth: number, swipedEvent: TimelineEvent, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[])=> {
            const referEventOrderInFetched = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const heightsOfFetchedEvents = getEventHeights(fetchedEvents)
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))

            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                const fEventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                const fEventOrderInFetched = i
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    // remained
                    if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop) {
                        let initialDistance = (currentEventTops[swipedEvent.order as number] + swipedEvent.boxTop) - currentEventTops[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else {
                        let initialDistance = currentEventTops[swipedEvent.order as number] - currentEventTops[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                } else {
                    // new
                    if (depth < currentDepth) {
                        let initialDistance
                        if (fEventOrderInFetched <= referEventOrderInFetched) initialDistance = currentEventTops[swipedEvent.order as number] + (eventBoxHeight + 2 * overlapBottom)
                        else initialDistance = currentEventTops[swipedEvent.order as number] - (currentEventTops[currentEventTops.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else return {...fEvent, animation: 'fadeIn'}
                }
                return {...fEvent, animation: 'move' , distance: distance}
            })
            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                let distance = 0
                let cEventOrderInCurrent = i
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    //disappeared
                    if (depth > currentDepth) {
                        let initialDistance = currentEventTops[swipedEvent.order as number] - currentEventTops[cEventOrderInCurrent]
                        let finalDistance
                        if (cEventOrderInCurrent <= (swipedEvent.order as number)) finalDistance = topsOfFetchedEvents[referEventOrderInFetched] + (eventBoxHeight + 2 * overlapBottom)
                        else finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - (topsOfFetchedEvents[topsOfFetchedEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        distance = initialDistance - finalDistance
                        return {...cEvent, animation: 'move' ,distance: distance, prev: true}
                    } else return {...cEvent, animation: 'fadeOut' , prev: true}
                } else return {...cEvent, animation: 'blank', prev: true}
            })
            let afterEffectTop = topsOfFetchedEvents[referEventOrderInFetched] - currentEventTops[swipedEvent.order as number]
            if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop) {
                afterEffectTop -= swipedEvent.boxTop
            }
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }
        const getEventsWithEffectForScroll = (fetchedEvents: TimelineEvent[]) => {
            return fetchedEvents.map(fEvent => {
                const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                if (cEvent) return {...fEvent, animation: 'none' }
                else return {...fEvent, animation: 'fadeIn' }
            })
        }
        const getScrollTop = (swipedEvent: TimelineEvent, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return {newScrollTop: 0, totalHeight: 0}
            const heightsOfFetchedEvents = getEventHeights(fetchedEvents)
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))
            let topInContainer = aboveTimelineHeight + timelineEdgeHeight + topsOfFetchedEvents[fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)]
            let newScrollTop = topInContainer - swipedEvent.top
            // if swipedEvent toggled and disappeared
            if (!fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop !== undefined) {newScrollTop -= swipedEvent.boxTop}
            return {newScrollTop: newScrollTop, totalHeight: sum(heightsOfFetchedEvents)}
        }
        const operateZoom = (e?: WheelEvent | TouchEvent | MouseEvent, deltaX?: number, classNames?: DOMTokenList) => {
            let depth: number
            let swipedEvent: TimelineEvent
            if (classNames) {
                if (!classNames.contains('fold') && !classNames.contains('unfold')) return
                depth = classNames.contains('fold') ? 0 : maxDepth
                swipedEvent = getSwipedEvent()
            } else {
                if (e instanceof WheelEvent) depth = e.deltaX > 0 ? currentDepth - 1 : currentDepth + 1
                else depth = (deltaX as number) < 0 ? currentDepth - 1 : currentDepth + 1
                swipedEvent = getSwipedEvent(e)
            }
            fetchEvents(depth, swipedEvent).then(({fetchedEvents, referEvent, isTopEnd, isBottomEnd}) => {
                if (fetchedEvents === currentEvents) return
                let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffectForZoom(depth, swipedEvent, referEvent, fetchedEvents)
                let { newScrollTop, totalHeight} = getScrollTop(swipedEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
                dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
                dispatch(updateAfterEffectTop(afterEffectTop))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateTotalHeight(totalHeight))
                dispatch(updateLastAction('zoom'))
                dispatch(updateCurrentDepth(depth))
                if (isTopEnd !== undefined && isBottomEnd !== undefined) {
                    dispatch(updateIsTopEnd(isTopEnd))
                    dispatch(updateIsBottomEnd(isBottomEnd))
                }

            })
        }
        const operateScroll = async (scrollUp?: boolean, uppermost?: boolean) => {
            let order: number, top: number, scrollEvent: TimelineEvent
            if (uppermost) scrollEvent = {...currentEvents[0], ephemerisTime: "0", order: 0 , top: 0}
            else {
                order =  scrollUp ? 0 : currentEvents.length - 1
                top = aboveTimelineHeight + timelineEdgeHeight + currentEventTops[order] - scrollWrapper.scrollTop
                scrollEvent = {...currentEvents[order], order: order, top: top}
            }
            await fetchEvents(currentDepth, scrollEvent).then(({fetchedEvents, referEvent, isTopEnd, isBottomEnd}) => {
                if (fetchedEvents.every(fEvent => currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) !== -1)) {
                    if (uppermost) scrollWrapper.scrollTop = 0
                    return
                }
                fetchedEvents = getEventsWithEffectForScroll(fetchedEvents)
                let newScrollTop = 0, totalHeight = sum(getEventHeights(fetchedEvents))
                if (!uppermost) {
                    newScrollTop = getScrollTop(scrollEvent, referEvent, fetchedEvents).newScrollTop
                }
                setTimeout(() => {
                    dispatch(updateCurrentEvents(fetchedEvents))
                    dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateTotalHeight(totalHeight))
                    dispatch(updateLastAction('scroll'))
                    if (isTopEnd !== undefined && isBottomEnd !== undefined) {
                        dispatch(updateIsTopEnd(isTopEnd))
                        dispatch(updateIsBottomEnd(isBottomEnd))
                    }
                }, 500)
            })
        }
        const handleWheel = async (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                if (!isLoading && Math.abs(e.deltaX) > 90) {
                    isLoading = true
                    await operateZoom(e)
                    setTimeout(() => isLoading = false, 500)
                }
            }
        }
        const handleTouch = async (e: TouchEvent) => {
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            } else if (e.type === 'touchend' && startX !== null && startY !== null) {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const deltaX = endX - startX;
                const deltaY = endY - startY
                if (deltaX !== 0) {
                    e.preventDefault()
                    if (!isLoading && Math.abs(deltaX) > 70 && Math.abs(deltaY) < 20) {
                        isLoading = true
                        await operateZoom(e, deltaX)
                        setTimeout(() => isLoading = false, 500)
                    }
                }
            }
        }
        const handleDrag = async (e: MouseEvent) => {
            if (e.type === 'mousedown') {
                startX = e.clientX;
            } else if (e.type === 'mousemove' && startX){
                const endX = e.clientX;
                const deltaX = endX - startX
                if (!isLoading && Math.abs(deltaX) > 50) {
                    isLoading = true
                    await operateZoom(e, deltaX)
                    setTimeout(() => isLoading = false, 500)
                }
            } else {
                startX = null
            }
        }
        const handleClick = async (e: MouseEvent) => {
            const toolbarButton = e.currentTarget as HTMLButtonElement
            const classNames = toolbarButton.classList
            if (!isLoading) {
                isLoading = true
                if (classNames.contains('uppermost')) {
                    await operateScroll(undefined, true)
                    setTimeout(() => isLoading = false, 500)
                } else {
                    await operateZoom(undefined, undefined, classNames)
                    setTimeout(() => isLoading = false, 500)
                }
            }
        }
        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let scrollUp = scrollWrapper.scrollTop < 150
            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 150
            if (!isLoading && (scrollUp || scrollDown)) {
                isLoading = true
                await operateScroll(scrollUp)
                setTimeout(() => isLoading = false, 500)
            }
        }

        timeline.addEventListener('wheel' , handleWheel);
        timeline.addEventListener('touchstart' , handleTouch);
        timeline.addEventListener('touchend' , handleTouch);
        // timeline.addEventListener('mousedown' , handleDrag);
        // timeline.addEventListener('mousemove' , handleDrag);
        // timeline.addEventListener('mouseup' , handleDrag);
        toolbarButtons?.forEach(toolbarButton => toolbarButton.addEventListener('click', handleClick))
        document.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            timeline.removeEventListener('touchstart' , handleTouch);
            timeline.removeEventListener('touchend' , handleTouch);
            // timeline.removeEventListener('mousedown' , handleDrag);
            // timeline.removeEventListener('mousemove' , handleDrag);
            // timeline.removeEventListener('mouseup' , handleDrag);
            toolbarButtons?.forEach(toolbarButton => toolbarButton.removeEventListener('click', handleClick))
            document.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
}
export default useOperateTimeline
