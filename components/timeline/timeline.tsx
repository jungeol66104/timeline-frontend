// modules
import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateTotalHeight, updateData ,decrementDepth, incrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updateLastAction, updatePrevEventsWithEffect, updateScrollTop, updateAfterEffectTop} from "@/store/slices/eventsSlice";
import {EventWithOrderTop, initialEvents, TimelineEvent} from '@/public/events'
import {sum, julianDateToEvent} from '@/utils/global'
// components
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import AfterEffectEvents from "@/components/timeline/afterEffectEvents";
const Timeline = ({ data, initialData, scrollRef }: {data: TimelineEvent[], initialData: TimelineEvent[], scrollRef: RefObject<HTMLDivElement>}) => {
    const timelineRef: RefObject<HTMLDivElement> = useRef(null)

    const dispatch = useDispatch()
    const currentDepth = useSelector((state: RootState) => state.reducer.events.currentDepth)
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const currentEventsWithEffect = useSelector((state: RootState) => state.reducer.events.currentEventsWithEffect)
    const scrollTop = useSelector((state: RootState) => state.reducer.events.scrollTop)
    const lastAction = useSelector((state: RootState) => state.reducer.events.lastAction)
    const totalHeight = useSelector((state: RootState) => state.reducer.events.totalHeight)

    const aboveTimelineHeight = 70
    const eventBoxHeight = 124
    const overlapBottom = 6

    // prevents additional zoom
    let isScrolling = true
    if (lastAction === 'zoomIn' || lastAction === 'zoomOut') {setTimeout(() => {isScrolling = false}, 500)}
    else {isScrolling = false}

    // initialData setup
    useEffect(() => {
        const heightsOfInitialEvents = initialData.map(IEvent => {
            if (IEvent.isToggle) return (38 + (IEvent.toggleEvents.length + 1) * 124)
            else return (eventBoxHeight + IEvent.overlap * overlapBottom)
        }) as number[]

        dispatch(updateCurrentEvents(initialData))
        dispatch(updateCurrentEventsWithEffect(initialData))
        dispatch(updatePrevEventsWithEffect(initialData))
        dispatch(updateData(data))
        dispatch(updateTotalHeight(sum(heightsOfInitialEvents)))
    }, [dispatch, initialData]);

    // scroll setup
    useEffect(() => {
        const scrollWrapper = scrollRef.current
        if (!scrollWrapper) return
        scrollWrapper.scrollTop = scrollTop
    },[scrollTop])

    // event handlers
    useEffect(() => {
        const scrollWrapper = scrollRef.current
        const timeline = timelineRef.current
        if (!scrollWrapper || !timeline) return

        const eventElements = Array.from(timeline.querySelectorAll('.eventBox'))
        let heightsOfCurrentEvents = eventElements.map(l => l.getBoundingClientRect().height)
        let topsOfCurrentEvents = heightsOfCurrentEvents.map((height, i) => sum(heightsOfCurrentEvents.slice(0,i)))

        // functions
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent) : EventWithOrderTop => {
            let clientYInContainer = scrollWrapper.scrollTop + e.clientY
            let order = topsOfCurrentEvents.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
            let top = topsOfCurrentEvents[order] + aboveTimelineHeight - scrollWrapper.scrollTop
            let insideBoxTop = top
            if (heightsOfCurrentEvents[order] > eventBoxHeight + 2 * overlapBottom) {
                let clientYInBox = clientYInContainer - (topsOfCurrentEvents[order] + aboveTimelineHeight)
                let orderInBox = 0
                if (clientYInBox > 38) {orderInBox = Math.floor((clientYInBox - 38) / 124)}
                insideBoxTop = 38 + orderInBox * 124
            }
            return {...currentEvents[order], order: order, top: top, boxTop: insideBoxTop}
        }

        const fetchEventsForZoom = (depth: number, swipedEvent: EventWithOrderTop, events: TimelineEvent[]) => {
            if (depth === 3 || depth === -1) return {fetchedEvents: currentEvents, referEvent: swipedEvent}
            // initial setup
            let referEvent = swipedEvent
            // need to exclude same date events of referEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let eventsAboveTarget = events.slice(0, targetOrderInEvents).filter(event => event.julianDate !== referEvent.julianDate)
            let eventsBelowTarget = events.slice(targetOrderInEvents + 1, ).filter(event => event.julianDate !== referEvent.julianDate)
            // zoomOut & swipedEvent disappeared
            if (swipedEvent.depth > depth) {
                let rightAboveDate = eventsAboveTarget.findLast(event => event.depth <= depth)?.julianDate
                let rightBelowDate = eventsBelowTarget.find(event => event.depth <= depth)?.julianDate
                if (rightAboveDate && rightBelowDate) {referEvent = Math.abs(referEvent.julianDate - rightAboveDate) >= Math.abs(referEvent.julianDate - rightBelowDate) ? {...julianDateToEvent(rightBelowDate, events), order: 0, top: 0} : {...julianDateToEvent(rightAboveDate, events), order: 0, top: 0}}
                else {referEvent = rightAboveDate !== undefined ? {...julianDateToEvent(rightAboveDate, events), order: 0, top: 0} : rightBelowDate !== undefined ? {...julianDateToEvent(rightBelowDate, events), order: 0, top: 0} : null as unknown as EventWithOrderTop}
                targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
                eventsAboveTarget = events.slice(0, targetOrderInEvents).filter(event => event.julianDate !== referEvent.julianDate)
                eventsBelowTarget = events.slice(targetOrderInEvents + 1, ).filter(event => event.julianDate !== referEvent.julianDate)
            }
            let fetchedEvents: TimelineEvent[] = [referEvent]
            let julianDatesAboveTargetWithDepth = Array.from(new Set(eventsAboveTarget.filter(event => event.depth <= depth).map(event => event.julianDate)))
            let julianDatesBelowTargetWithDepth = Array.from(new Set(eventsBelowTarget.filter(event => event.depth <= depth).map(event => event.julianDate)))
            for (let i = julianDatesAboveTargetWithDepth.length - 1 ; i >= 0 ; i--) {
                fetchedEvents.unshift(julianDateToEvent(julianDatesAboveTargetWithDepth[i], eventsAboveTarget))
                if (fetchedEvents.length === 21) break
            }
            for (let i = 0 ; i < julianDatesBelowTargetWithDepth.length ; i++) {
                fetchedEvents.push(julianDateToEvent(julianDatesBelowTargetWithDepth[i], eventsBelowTarget))
                if (fetchedEvents.length === 41) break
            }
            if (fetchedEvents.length < 41) {
                for (let i = julianDatesAboveTargetWithDepth.length - 21 ; i >= 0 ; i--) {
                    fetchedEvents.unshift(julianDateToEvent(julianDatesAboveTargetWithDepth[i], eventsAboveTarget))
                    if (fetchedEvents.length === 41) break
                }
            }
            fetchedEvents = fetchedEvents.map(fEvent => {
                const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                if (cEvent) return cEvent
                else return fEvent
            })
            return {fetchedEvents, referEvent}
        }
        const fetchEventsForScroll = (scrollEvent: EventWithOrderTop, events: TimelineEvent[]) => {
            let referEvent = scrollEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let addedEvents: TimelineEvent[] = []
            let fetchedEvents: TimelineEvent[] = [...currentEventsWithEffect]
            if (scrollEvent.order === 0) {
                let eventsAboveTarget = events.slice(0, targetOrderInEvents).filter(event => event.julianDate !== referEvent.julianDate)
                let julianDatesAboveTargetWithDepth = Array.from(new Set(eventsAboveTarget.filter(event => event.depth <= currentDepth).map(event => event.julianDate)))
                for (let i = julianDatesAboveTargetWithDepth.length - 1 ; i >= 0 ; i--) {
                    addedEvents.unshift(julianDateToEvent(julianDatesAboveTargetWithDepth[i], eventsAboveTarget))
                    if (addedEvents.length === 21) break
                }
                    fetchedEvents.unshift(...addedEvents)
                    fetchedEvents = fetchedEvents.slice(0, fetchedEvents.length - addedEvents.length)
            }
            if (scrollEvent.order === currentEvents.length - 1) {
                let eventsBelowTarget = events.slice(targetOrderInEvents + 1, ).filter(event => event.julianDate !== referEvent.julianDate)
                let julianDatesBelowTargetWithDepth = Array.from(new Set(eventsBelowTarget.filter(event => event.depth <= currentDepth).map(event => event.julianDate)))
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
        const getEventsWithEffectTest = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            const order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const heightsOfFetchedEvents = fetchedEvents.map(fEvent => {
                if (fEvent.isToggle) return (38 + (fEvent.toggleEvents.length + 1) * 124)
                else return (eventBoxHeight + fEvent.overlap * overlapBottom)
            }) as number[]
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))

            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                const fEventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                const fEventOrderInFetched = i
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    // remained
                    if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle) {
                        if (!swipedEvent.boxTop) return
                        let initialDistance = (topsOfCurrentEvents[swipedEvent.order] + swipedEvent.boxTop) - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else {
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order] - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                } else {
                    // new
                    if (depth < currentDepth) {
                        let initialDistance
                        if (fEventOrderInFetched <= order) initialDistance = topsOfCurrentEvents[swipedEvent.order] + (eventBoxHeight + 2 * overlapBottom)
                        else initialDistance = topsOfCurrentEvents[swipedEvent.order] - (topsOfCurrentEvents[topsOfCurrentEvents.length - 1] + (eventBoxHeight + 2 * overlapBottom))
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    } else return fEvent
                }
                return {...fEvent, distance: distance}
            })

            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                let distance = 0
                let cEventOrderInCurrent = i
                let cEventOrderInFetched = fetchedEvents.findIndex(fEvent => fEvent.id === cEvent.id)
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                //disappeared
                    if (depth > currentDepth) {
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order] - topsOfCurrentEvents[cEventOrderInCurrent]
                        let finalDistance
                        if (cEventOrderInFetched <= order) finalDistance = topsOfFetchedEvents[order] + (eventBoxHeight + 2 * overlapBottom)
                        else finalDistance = topsOfFetchedEvents[order] - (topsOfFetchedEvents[topsOfFetchedEvents.length -1] + (eventBoxHeight + 2 * overlapBottom))
                        distance = finalDistance - initialDistance
                        return {...cEvent, distance: distance, prev: true}
                    } else return {...cEvent, fadeout: true, prev: true}
                } else return {...cEvent, blank: true, prev: true}
            })

            let afterEffectTop = topsOfFetchedEvents[order] - topsOfCurrentEvents[swipedEvent.order]
            if (depth < currentDepth && !fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop) {
                afterEffectTop -= swipedEvent.boxTop
            }
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }
        const getScrollTop = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return {newScrollTop: 0, totalHeight: 0}
            const heightsOfFetchedEvents = fetchedEvents.map(fEvent => {
                if (fEvent.isToggle) {return (38 + (fEvent.toggleEvents.length + 1) * 124)}
                else return (eventBoxHeight + fEvent.overlap * overlapBottom)
            }) as number[]
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))
            let topInContainer = aboveTimelineHeight + topsOfFetchedEvents[fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)]
            let newScrollTop = topInContainer - swipedEvent.top
            // if swipedEvent toggled and disappeared
            if (!fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle && swipedEvent.boxTop !== undefined) {newScrollTop -= swipedEvent.boxTop}
            return {newScrollTop: newScrollTop, totalHeight: sum(heightsOfFetchedEvents)}
        }

        const operateZoom = (e: WheelEvent) => {
            const depth = e.deltaX > 0 ? currentDepth -1 : currentDepth + 1
            let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e)
            let { fetchedEvents, referEvent} = fetchEventsForZoom(depth, swipedEvent, data)
            if (fetchedEvents === currentEvents) return
            let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffectTest(depth, swipedEvent, referEvent, fetchedEvents)
            let {newScrollTop, totalHeight} = getScrollTop(swipedEvent, referEvent, fetchedEvents)
            e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
            dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
            dispatch(updateAfterEffectTop(afterEffectTop))
            dispatch(updateScrollTop(newScrollTop))
            dispatch(updateTotalHeight(totalHeight))
            e.deltaX > 0 ? dispatch(updateLastAction('zoomOut')) : dispatch(updateLastAction('zoomIn'))
        }
        const operateScroll = (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            //this code below can be generalized in the future
            let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * overlapBottom)
            let arrayOfTop = arrayOfHeight.map((height, i) => sum(arrayOfHeight.slice(0,i)))
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
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                if (!isScrolling && Math.abs(e.deltaX) > 90) {operateZoom(e)}
            }
        }
        const handleScroll = () => {
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            if (!viewportHeight) return
            let scrollUp = scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.1
            let scrollDown = scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.9 - viewportHeight
            if (scrollUp || scrollDown) {operateScroll(scrollUp)}
        }

        timeline.addEventListener('wheel' , handleWheel);
        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            scrollWrapper.removeEventListener('scroll', handleScroll)
        };
    });
    return (
        <div ref={timelineRef} className='timeline flex flex-col max-w-lg relative overflow-hidden' style={{height: `${totalHeight + 20}px`, transition: 'height 0.5s'}}>
            <TimelineFrame />
            <TimelineEvents />
            {(lastAction === 'zoomIn' || lastAction === 'zoomOut') && <AfterEffectEvents />}
        </div>
    )
}
export default Timeline