import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TimelineEvent} from '@/public/events'
import {sum, julianDateToEvent, getEventHeights} from '@/utils/global'
import {selectCurrentEvents, selectCurrentEventsWithEffect, selectCurrentTimeline, selectData, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect} from "@/store/slices/eventsSlice";
import {
    decrementDepth,
    incrementDepth,
    selectCurrentDepth,
    selectLastAction,
    selectScrollTop,
    updateAfterEffectTop,
    updateCurrentDepth,
    updateLastAction,
    updateScrollTop,
    updateTotalHeight
} from "@/store/slices/effectsSlice";
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import AfterEffectEvents from "@/components/timeline/afterEffectEvents";
import api from "@/utils/api"
// refactoring: needed (handler refactoring, vars need to be globalized?)

const Timeline = () => {
    const timeline: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timeline') : null
    const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    console.log(currentEvents)
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    const data = useSelector(selectData)
    const currentDepth = useSelector(selectCurrentDepth)
    const scrollTop = useSelector(selectScrollTop)
    const lastAction = useSelector(selectLastAction)

    const aboveTimelineHeight = 70
    const eventBoxHeight = 124
    const overlapBottom = 6

    let isLoading = true
    if (lastAction === 'zoom' || 'scroll') {setTimeout(() => {isLoading = false}, 500)}
    else {isLoading = false}

    // clicking back button
    useEffect(() => {
        if (sessionStorage.getItem('lastAction') === 'enter') {
            dispatch(updateCurrentEvents(JSON.parse(sessionStorage.getItem('currentEvents') as string)))
            dispatch(updateCurrentEventsWithEffect(JSON.parse(sessionStorage.getItem('currentEvents') as string)))
            dispatch(updateTotalHeight(JSON.parse(sessionStorage.getItem('totalHeight') as string)))
            dispatch(updateCurrentDepth(JSON.parse(sessionStorage.getItem('currentDepth') as string)))
            dispatch(updateScrollTop(JSON.parse(sessionStorage.getItem('scrollTop') as string)))
            dispatch(updateLastAction('back'))
            sessionStorage.clear()
        }
    }, []);

    // scroll setup
    useEffect(() => {
        if (!scrollWrapper) return
        scrollWrapper.scrollTop = scrollTop
    },[scrollTop])

    // event handlers
    useEffect(() => {
        if (!scrollWrapper || !timeline) return

        const heightsOfCurrentEvents = getEventHeights(currentEvents)
        let topsOfCurrentEvents = heightsOfCurrentEvents.map((_, i) => sum(heightsOfCurrentEvents.slice(0,i)))
        let startX: number | null = null

        // functions
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent | TouchEvent | MouseEvent) : TimelineEvent => {
            let clientYInContainer: number
            if (e instanceof TouchEvent) {
                const clientY = e.changedTouches[0].clientY
                clientYInContainer = scrollWrapper.scrollTop + clientY
            } else {
                clientYInContainer = scrollWrapper.scrollTop + e.clientY
            }
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
        const fetchEventsForScroll = (scrollEvent: TimelineEvent, events: TimelineEvent[]) => {
            let referEvent = scrollEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let addedEvents: TimelineEvent[] = []
            let fetchedEvents: TimelineEvent[] = [...currentEventsWithEffect]
            if (scrollEvent.order === 0) {
                let eventsAboveTarget = events.slice(0, targetOrderInEvents).filter(event => event.julianDate !== referEvent.julianDate)
                let julianDatesAboveTargetWithDepth = Array.from(new Set(eventsAboveTarget.filter(event => event.depth as number <= currentDepth).map(event => event.julianDate)))
                for (let i = julianDatesAboveTargetWithDepth.length - 1 ; i >= 0 ; i--) {
                    addedEvents.unshift(julianDateToEvent(julianDatesAboveTargetWithDepth[i], eventsAboveTarget))
                    if (addedEvents.length === 21) break
                }
                    fetchedEvents.unshift(...addedEvents)
                    fetchedEvents = fetchedEvents.slice(0, fetchedEvents.length - addedEvents.length)
            }
            if (scrollEvent.order === currentEvents.length - 1) {
                let eventsBelowTarget = events.slice(targetOrderInEvents + 1, ).filter(event => event.julianDate !== referEvent.julianDate)
                let julianDatesBelowTargetWithDepth = Array.from(new Set(eventsBelowTarget.filter(event => event.depth as number <= currentDepth).map(event => event.julianDate)))
                for (let i = 0 ; i < julianDatesBelowTargetWithDepth.length ; i++) {
                    addedEvents.push(julianDateToEvent(julianDatesBelowTargetWithDepth[i], eventsBelowTarget))
                    if (addedEvents.length === 21) break
                }
                fetchedEvents.push(...addedEvents)
                fetchedEvents = fetchedEvents.slice(addedEvents.length, )
            }
            if (addedEvents.length === 0) return {fetchedEvents: currentEvents, referEvent: scrollEvent}

            fetchedEvents = fetchedEvents.map(fEvent => {
                const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                if (cEvent) return cEvent
                else return fEvent
            })
            return {fetchedEvents, referEvent}
        }
        const fetchEventsTest = async (depth: number, pivotEvent: TimelineEvent) => {
            if (depth === 2 || depth === -1) return {fetchedEvents: currentEvents, referEvent: pivotEvent}
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
                console.error('Error fetching initial data during SSR:', error);
                return {fetchedEvents: currentEvents, referEvent: pivotEvent }
            }
        }
        const getEventsWithEffectTest = (depth: number, swipedEvent: TimelineEvent, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[])=> {
            const order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const heightsOfFetchedEvents = getEventHeights(fetchedEvents)
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))

            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                const fEventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                const fEventOrderInFetched = i
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    // remained
                    if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle) {
                        if (!swipedEvent.boxTop) return
                        let initialDistance = (topsOfCurrentEvents[swipedEvent.order as number] + swipedEvent.boxTop) - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else {
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order as number] - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                } else {
                    // new
                    if (depth < currentDepth) {
                        let initialDistance
                        if (fEventOrderInFetched <= order) initialDistance = topsOfCurrentEvents[swipedEvent.order as number] + (eventBoxHeight + 2 * overlapBottom)
                        else initialDistance = topsOfCurrentEvents[swipedEvent.order as number] - (topsOfCurrentEvents[topsOfCurrentEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else return fEvent
                }
                return {...fEvent, distance: distance}
            })

            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                let distance = 0
                let cEventOrderInCurrent = i
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                //disappeared
                    if (depth > currentDepth) {
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order as number] - topsOfCurrentEvents[cEventOrderInCurrent]
                        let finalDistance
                        if (cEventOrderInCurrent <= (swipedEvent.order as number)) finalDistance = topsOfFetchedEvents[order] + (eventBoxHeight + 2 * overlapBottom)
                        else finalDistance = topsOfFetchedEvents[order] - (topsOfFetchedEvents[topsOfFetchedEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        distance = initialDistance - finalDistance
                        return {...cEvent, distance: distance, prev: true}
                    } else return {...cEvent, fadeout: true, prev: true}
                } else return {...cEvent, blank: true, prev: true}
            })

            let afterEffectTop = topsOfFetchedEvents[order] - topsOfCurrentEvents[swipedEvent.order as number]
            if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop) {
                afterEffectTop -= swipedEvent.boxTop
            }
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }
        const getEventsWithEffectForScroll = (fetchedEvents: TimelineEvent[]) => {
            return fetchedEvents.map(fEvent => {
                const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                if (cEvent) return {...fEvent, new: false }
                else return {...fEvent, new: true }
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
        const operateZoomTest = (e: WheelEvent | TouchEvent | MouseEvent, deltaX?: number) => {
            let depth: number
            if (e instanceof WheelEvent) {depth = e.deltaX > 0 ? currentDepth - 1 : currentDepth + 1}
            else {depth = (deltaX as number) < 0 ? currentDepth - 1 : currentDepth + 1}
            let swipedEvent: TimelineEvent = getSwipedEvent(scrollWrapper, e)
            fetchEventsTest(depth, swipedEvent).then(({fetchedEvents, referEvent}) => {
                if (fetchedEvents === currentEvents) return
                let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffectTest(depth, swipedEvent, referEvent, fetchedEvents)
                let { newScrollTop, totalHeight} = getScrollTop(swipedEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
                dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
                dispatch(updateAfterEffectTop(afterEffectTop))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateTotalHeight(totalHeight))
                dispatch(updateLastAction('zoom'))
                if (e instanceof WheelEvent) {
                    e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
                } else {
                    (deltaX as number) < 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
                }
            })
        }
        const operateScroll = (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            //this code below can be generalized in the future
            let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + (cEvent.overlap as number) * overlapBottom)
            let arrayOfTop = arrayOfHeight.map((_, i) => sum(arrayOfHeight.slice(0,i)))
            let top = aboveTimelineHeight + arrayOfTop[order] - scrollWrapper.scrollTop
            const scrollEvent = {...currentEvents[order], order: order, top: top }
            let { fetchedEvents, referEvent } = fetchEventsForScroll(scrollEvent, data)
            if (fetchedEvents === currentEvents) return
            let { newScrollTop, totalHeight } = getScrollTop(scrollEvent, referEvent, fetchedEvents)
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEvents))
            dispatch(updateScrollTop(newScrollTop))
            dispatch(updateTotalHeight(totalHeight))
            dispatch(updateLastAction('scroll'))
        }
        const operateScrollTest = (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            let top = aboveTimelineHeight + topsOfCurrentEvents[order] - scrollWrapper.scrollTop
            const scrollEvent = {...currentEvents[order], order: order, top: top }
            fetchEventsTest(currentDepth, scrollEvent).then(({fetchedEvents, referEvent}) => {
                if (fetchedEvents === currentEvents) return
                let { newScrollTop, totalHeight } = getScrollTop(scrollEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateTotalHeight(totalHeight))
                dispatch(updateLastAction('scroll'))
            })
        }
        const handleWheel = async (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                if (!isLoading && Math.abs(e.deltaX) > 90) {
                    isLoading = true
                    await operateZoomTest(e)
                    setTimeout(() => isLoading = false, 500)
                }
            }
        }
        const handleTouch = async (e: TouchEvent) => {
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
            } else if (e.type === 'touchend' && startX !== null) {
                const endX = e.changedTouches[0].clientX;
                const deltaX = endX - startX;
                if (deltaX !== 0) {
                    e.preventDefault()
                    if (!isLoading && Math.abs(deltaX) > 50) {
                        isLoading = true
                        await operateZoomTest(e, deltaX)
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
                    await operateZoomTest(e, deltaX)
                    setTimeout(() => isLoading = false, 500)
                    }
            } else {
                startX = null
            }
        }
        const handleScroll = async () => {
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            if (!viewportHeight) return
            let scrollUp = scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.1
            let scrollDown = scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.9 - viewportHeight
            if (!isLoading && (scrollUp || scrollDown)) {
                isLoading = true
                // await operateScrollTest(scrollUp)
                setTimeout(() => isLoading = false, 500)
            }
        }

        timeline.addEventListener('wheel' , handleWheel);
        timeline.addEventListener('mousedown' , handleDrag);
        timeline.addEventListener('mousemove' , handleDrag);
        timeline.addEventListener('mouseup' , handleDrag);
        timeline.addEventListener('touchstart' , handleTouch);
        timeline.addEventListener('touchend' , handleTouch);
        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            timeline.removeEventListener('mousedown' , handleDrag);
            timeline.removeEventListener('mousemove' , handleDrag);
            timeline.removeEventListener('mouseup' , handleDrag);
            timeline.removeEventListener('touchstart' , handleTouch);
            timeline.removeEventListener('touchend' , handleTouch);
            scrollWrapper.removeEventListener('scroll', handleScroll)
        };
    });
    return (
        <div className='timeline flex flex-col max-w-lg relative'>
            <TimelineFrame />
            <TimelineEvents />
            {(lastAction === 'zoom') && <AfterEffectEvents />}
        </div>
    )
}
export default Timeline