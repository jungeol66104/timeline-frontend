import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TimelineEvent} from '@/public/events'
import {sum, getEventHeights, getClickOrTouch} from '@/utils/global'
import {selectCurrentEvents, selectCurrentTimeline, selectPrevEventsWithEffect, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect} from "@/store/slices/contentsSlice";
import {decrementDepth, incrementDepth, selectAboveTimelineHeight, selectCurrentDepth, selectEventBoxHeight, selectLastAction, selectMaxDepth, selectOverlapBottom, selectScrollTop, selectTotalHeight, updateAfterEffectTop, updateLastAction, updateScrollTop, updateTotalHeight} from "@/store/slices/appearanceSlice";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
// afterEffect seems like that it does not affect UX
import AfterEffectEvents from "@/components/timeline/afterEffectEvents";
import api from "@/utils/api"
import Link from "next/link";
// refactoring: needed (mobile detection, scroll operation, height and top calculation)

const Timeline = () => {
    const dispatch = useDispatch()
    const latestScrollTop = useRef(0)
    // global vars
    const aboveTimelineHeight = useSelector(selectAboveTimelineHeight)
    const eventBoxHeight = useSelector(selectEventBoxHeight)
    const overlapBottom = useSelector(selectOverlapBottom)
    // effects
    const totalHeight = useSelector(selectTotalHeight)
    const currentDepth = useSelector(selectCurrentDepth)
    const maxDepth = useSelector(selectMaxDepth)
    const scrollTop = useSelector(selectScrollTop)
    const lastAction = useSelector(selectLastAction)
    // contents
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    // const prevEvents = useSelector(selectPrevEventsWithEffect)

    // suppress additional actions after zoom or scroll
    let isLoading = true
    if (lastAction === 'zoom' || lastAction === 'scroll') {setTimeout(() => {isLoading = false}, 500)}
    else {isLoading = false}

    // scroll setup
    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return
        // trick for stopping momentum scroll error in webkit based browsers
        scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        scrollWrapper.style.overflowY = 'auto'
    },[scrollTop])

    // event handlers
    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        const timeline: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timeline') : null
        if (!scrollWrapper || !timeline) return

        const heightsOfCurrentEvents = getEventHeights(currentEvents)
        let topsOfCurrentEvents = heightsOfCurrentEvents.map((_, i) => sum(heightsOfCurrentEvents.slice(0,i)))
        let startX: number | null = null
        let startY: number | null = null

        // functions
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent | TouchEvent | MouseEvent) : TimelineEvent => {
            let clientYInContainer = 0
            if (e instanceof TouchEvent) {clientYInContainer = scrollWrapper.scrollTop + e.changedTouches[0].clientY}
            else {clientYInContainer = scrollWrapper.scrollTop + e.clientY}
            let order = topsOfCurrentEvents.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
            let top = topsOfCurrentEvents[order] + aboveTimelineHeight - scrollWrapper.scrollTop
            let boxTop = top
            if (currentEvents[order].isToggle) {
                let clientYInBox = clientYInContainer - (topsOfCurrentEvents[order] + aboveTimelineHeight)
                let orderInBox = 0
                if (clientYInBox > 38) {orderInBox = Math.floor((clientYInBox - 38) / 124)}
                boxTop = 38 + orderInBox * 124
            }
            return {...currentEvents[order], order: order, top: top, boxTop: boxTop}
        }
        const fetchEvents = async (depth: number, pivotEvent: TimelineEvent) => {
            // pivotEvent === swipedEvent or scrollBasisEvent
            if (depth === maxDepth + 1 || depth === -1) return {fetchedEvents: currentEvents, referEvent: pivotEvent}
            try {
                const response = await api.post('/v1/getTimeline', {'timelineId': currentTimeline.id , 'depth': depth, 'pivotJulianDate': pivotEvent.julianDate})
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
                return {fetchedEvents, referEvent}
            } catch (error) {
                console.error('Error fetching data in useEffect:', error);
                return {fetchedEvents: currentEvents, referEvent: pivotEvent }
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
                        let initialDistance = (topsOfCurrentEvents[swipedEvent.order as number] + swipedEvent.boxTop) - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else {
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order as number] - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                } else {
                    // new
                    if (depth < currentDepth) {
                        let initialDistance
                        if (fEventOrderInFetched <= referEventOrderInFetched) initialDistance = topsOfCurrentEvents[swipedEvent.order as number] + (eventBoxHeight + 2 * overlapBottom)
                        else initialDistance = topsOfCurrentEvents[swipedEvent.order as number] - (topsOfCurrentEvents[topsOfCurrentEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
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
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order as number] - topsOfCurrentEvents[cEventOrderInCurrent]
                        let finalDistance
                        if (cEventOrderInCurrent <= (swipedEvent.order as number)) finalDistance = topsOfFetchedEvents[referEventOrderInFetched] + (eventBoxHeight + 2 * overlapBottom)
                        else finalDistance = topsOfFetchedEvents[referEventOrderInFetched] - (topsOfFetchedEvents[topsOfFetchedEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        distance = initialDistance - finalDistance
                        return {...cEvent, animation: 'move' ,distance: distance, prev: true}
                    } else return {...cEvent, animation: 'fadeOut' , prev: true}
                } else return {...cEvent, animation: 'blank', prev: true}
            })
            let afterEffectTop = topsOfFetchedEvents[referEventOrderInFetched] - topsOfCurrentEvents[swipedEvent.order as number]
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
            let topInContainer = aboveTimelineHeight + topsOfFetchedEvents[fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)]
            let newScrollTop = topInContainer - swipedEvent.top
            // if swipedEvent toggled and disappeared
            if (!fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop !== undefined) {newScrollTop -= swipedEvent.boxTop}
            return {newScrollTop: newScrollTop, totalHeight: sum(heightsOfFetchedEvents)}
        }
        const operateZoom = (e: WheelEvent | TouchEvent | MouseEvent, deltaX?: number) => {
            let depth: number
            if (e instanceof WheelEvent) {depth = e.deltaX > 0 ? currentDepth - 1 : currentDepth + 1}
            else {depth = (deltaX as number) < 0 ? currentDepth - 1 : currentDepth + 1}
            let swipedEvent: TimelineEvent = getSwipedEvent(scrollWrapper, e)
            fetchEvents(depth, swipedEvent).then(({fetchedEvents, referEvent}) => {
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
                if (e instanceof WheelEvent) {e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())}
                else {(deltaX as number) < 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())}
            })
        }
        const operateScroll = async (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            let top = aboveTimelineHeight + topsOfCurrentEvents[order] - scrollWrapper.scrollTop
            const scrollEvent = {...currentEvents[order], order: order, top: top }
            await fetchEvents(currentDepth, scrollEvent).then(({fetchedEvents, referEvent}) => {
                if (fetchedEvents.every(fEvent => currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) !== -1)) return
                fetchedEvents = getEventsWithEffectForScroll(fetchedEvents)
                let { newScrollTop, totalHeight } = getScrollTop(scrollEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                dispatch(updatePrevEventsWithEffect(currentEvents))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateTotalHeight(totalHeight))
                dispatch(updateLastAction('scroll'))
            })
        }

        const operateScrollTest = async (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            let top = aboveTimelineHeight + topsOfCurrentEvents[order] - scrollWrapper.scrollTop
            const scrollEvent = {...currentEvents[order], order: order, top: top}
            await fetchEvents(currentDepth, scrollEvent).then(({fetchedEvents, referEvent}) => {
                if (fetchedEvents.every(fEvent => currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) !== -1)) return
                fetchedEvents = getEventsWithEffectForScroll(fetchedEvents)
                let { newScrollTop, totalHeight } = getScrollTop(scrollEvent, referEvent, fetchedEvents)
                setTimeout(() => {
                    dispatch(updateCurrentEvents(fetchedEvents))
                    dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateTotalHeight(totalHeight))
                    dispatch(updateLastAction('scroll'))
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
        const handleScroll = async () => {
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            if (!viewportHeight) return
            let scrollUp = scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.05
            let scrollDown = scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.95 - viewportHeight
            if (!isLoading && (scrollUp || scrollDown)) {
                isLoading = true
                await operateScroll(scrollUp)
                setTimeout(() => isLoading = false, 500)
            }
        }

        const handleScrollTest = async () => {
            latestScrollTop.current = scrollWrapper.scrollTop
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            if (!viewportHeight) return
            let scrollUp = scrollWrapper.scrollTop < 25
            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - (viewportHeight - aboveTimelineHeight) - 25
            if (!isLoading && (scrollUp || scrollDown)) {
                isLoading = true
                await operateScrollTest(scrollUp)
                setTimeout(() => isLoading = false, 500)
            }
        }

        timeline.addEventListener('wheel' , handleWheel);
        timeline.addEventListener('mousedown' , handleDrag);
        timeline.addEventListener('mousemove' , handleDrag);
        timeline.addEventListener('mouseup' , handleDrag);
        timeline.addEventListener('touchstart' , handleTouch);
        timeline.addEventListener('touchend' , handleTouch);
        scrollWrapper.addEventListener('scroll', handleScrollTest)
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            timeline.removeEventListener('mousedown' , handleDrag);
            timeline.removeEventListener('mousemove' , handleDrag);
            timeline.removeEventListener('mouseup' , handleDrag);
            timeline.removeEventListener('touchstart' , handleTouch);
            timeline.removeEventListener('touchend' , handleTouch);
            scrollWrapper.removeEventListener('scroll', handleScrollTest)
        };
    });

    return (
        <div className='timeline absolute w-full overflow-hidden' style={{height: totalHeight + 140, zIndex: 9998}}>
            <TimelineFrame />
            <Link href={'/'} className={'relative'} style={{zIndex: 9999}}>timeline</Link>
            <TimelineEvents />
            {/*{(lastAction === 'zoom') && <AfterEffectEvents />}*/}
        </div>
    )
}
export default Timeline