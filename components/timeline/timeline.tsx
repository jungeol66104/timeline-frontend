// modules
import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {updateTotalHeight, updateData ,decrementDepth, incrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updateLastAction, updatePrevEventsWithEffect, updateScrollTop, updateAfterEffectTop} from "@/store/slices/eventsSlice";
import {EventWithOrderTop, TimelineEvent} from '@/public/events'
import {sum, julianDateToEvent} from '@/utils/global'
// components
import TimelineFrame from "@/components/timeline/timelineFrame";
import TimelineEvents from "@/components/timeline/timelineEvents";
import AfterEffect from "@/components/timeline/afterEffect";
import eventBox from "@/components/timeline/eventBox";
import {current} from "immer";

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
        dispatch(updateCurrentEvents(initialData))
        dispatch(updateCurrentEventsWithEffect(initialData))
        dispatch(updatePrevEventsWithEffect(initialData))
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
        let arrayOfHeight = eventElements.map(l => l.getBoundingClientRect().height)

        dispatch(updateData(data))
        dispatch(updateTotalHeight(sum(arrayOfHeight)))

        // functions
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent) : EventWithOrderTop => {
            let clientYInContainer = scrollWrapper.scrollTop + e.clientY
            let arrayOfTop = arrayOfHeight.map((height, i) => sum(arrayOfHeight.slice(0,i)))
            let order = arrayOfTop.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
            let top = arrayOfTop[order] + aboveTimelineHeight - scrollWrapper.scrollTop
            let insideBoxTop = top
            if (arrayOfHeight[order] > eventBoxHeight + 3 * overlapBottom) {
                let clientYInBox = clientYInContainer - (arrayOfTop[order] + aboveTimelineHeight)
                if (clientYInBox > 38) {
                    let orderInBox = (clientYInBox - 38) % 124
                    insideBoxTop = 38 + orderInBox * 124
                }
            }
            if (arrayOfHeight[order] > eventBoxHeight + overlapBottom * 2) insideBoxTop = 0
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
        const getEventsWithEffect = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            const order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                // remained
                if(currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    // zoom in
                    if (depth > currentDepth) {
                        let initialOrder = order + (currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order)
                        let finalOrder = i
                        if (initialOrder >= finalOrder) {for (let o = initialOrder; o > finalOrder ; o--) {distance += eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                        else {for (let o = initialOrder; o < finalOrder ; o++) {distance -= eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                    // zoom out
                    } else {
                        let initialOrder = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                        let finalOrder = swipedEvent.order + (i - order)
                        if (initialOrder <= finalOrder) {for (let o = finalOrder; o > initialOrder ; o--) {distance -= eventBoxHeight + currentEvents[o].overlap * overlapBottom}}
                        else {for (let o = finalOrder; o < initialOrder ; o++) {distance += eventBoxHeight + currentEvents[o].overlap * overlapBottom}}
                    }
                    // new
                } else {
                    // zoom in
                    if (depth > currentDepth) return fEvent
                    // zoom out
                    else {
                        let initialOrder = i < order ? -1 : currentEvents.length
                        let finalOrder = swipedEvent.order + (i - order)
                        if (initialOrder <= finalOrder) {for (let o = finalOrder; o > initialOrder ; o--) {distance -= eventBoxHeight + currentEvents[o].overlap * overlapBottom}}
                        else {for (let o = finalOrder; o < initialOrder ; o++) {distance += eventBoxHeight + currentEvents[o].overlap * overlapBottom}}
                    }
                }
                return {...fEvent, distance: distance}
            })
            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                let distance = 0
                // disappear
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    // zoom in
                    if (depth > currentDepth) {
                        let initialOrder = order + (i - swipedEvent.order)
                        let finalOrder = i < swipedEvent.order ? -1 : fetchedEvents.length
                        if (initialOrder >= finalOrder) {for (let o = initialOrder ; o > finalOrder ; o--) {distance -= eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                        else {for (let o = initialOrder; o < finalOrder; o++) {distance += eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                    }
                    // zoom out
                    else return {...cEvent, fadeout: true}
                } else return cEvent
                return {...cEvent, distance: distance}
            })
            // get afterEffectTop
            let referTop = 0
            let swipedTop = 0
            let fetchedEventsHeight = fetchedEvents.map(fEvent => eventBoxHeight + fEvent.overlap * overlapBottom).slice(0, order)
            let currentEventsHeight = currentEvents.map(cEvent => eventBoxHeight + cEvent.overlap * overlapBottom).slice(0, swipedEvent.order)
            fetchedEventsHeight.forEach(height => referTop += height)
            currentEventsHeight.forEach(height => swipedTop += height)
            const afterEffectTop = referTop - swipedTop
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }

        const getEventsWithEffectTest = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            const order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const heightsOfCurrentEvents = eventElements.map(l => l.getBoundingClientRect().height)
            const heightsOfFetchedEvents = fetchedEvents.map(fEvent => {
                if (fEvent.isToggle && fEvent.toggleEvents) return (50 + fEvent.toggleEvents.length * 112 + (fEvent.toggleEvents.length - 1) * 6)
                else return (eventBoxHeight + fEvent.overlap * overlapBottom)
            }) as number[]
            const topsOfCurrentEvents = heightsOfCurrentEvents.map((_, i) => sum(heightsOfCurrentEvents.slice(0,i)))
            const topsOfFetchedEvents = heightsOfFetchedEvents.map((_, i) => sum(heightsOfFetchedEvents.slice(0,i)))

            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                const fEventOrderInCurrent = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                const fEventOrderInFetched = i
                //remained
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    //zoom in
                    if (depth > currentDepth) {
                        let initialDistance = topsOfCurrentEvents[swipedEvent.order] - topsOfCurrentEvents[fEventOrderInCurrent]
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                    // zoom out
                    else {
                        // swiped event disappears & swipedEvent was toggled
                        if (!fetchedEvents.find(fEvent => fEvent.id === swipedEvent.id) && swipedEvent.isToggle) {
                            if (!swipedEvent.boxTop) return
                            if (fEventOrderInFetched <= order) {
                                let initialDistance = (topsOfCurrentEvents[swipedEvent.order] + swipedEvent.boxTop) - topsOfCurrentEvents[fEventOrderInCurrent]
                                let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                                distance = finalDistance - initialDistance
                            } else {
                                let initialDistance = (topsOfCurrentEvents[swipedEvent.order] + swipedEvent.boxTop) - topsOfCurrentEvents[fEventOrderInCurrent]
                                let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                                distance = finalDistance - initialDistance
                            }
                        }
                        // else
                        else {
                            // refactor with above after testing
                            let initialDistance = topsOfCurrentEvents[swipedEvent.order] - topsOfCurrentEvents[fEventOrderInCurrent]
                            let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                            distance = finalDistance - initialDistance
                        }
                    }
                }
                // new
                else {
                    // zoom in
                    if (depth > currentDepth) return fEvent
                    // zoom out
                    else {
                        let initialDistance
                        if (fEventOrderInFetched <= order) {
                            initialDistance = topsOfCurrentEvents[swipedEvent.order] + (eventBoxHeight + 3 * overlapBottom)
                        } else {
                            initialDistance = topsOfCurrentEvents[swipedEvent.order] - (topsOfCurrentEvents[topsOfCurrentEvents.length - 1]  + (eventBoxHeight + 3 * overlapBottom))
                        }
                        let finalDistance = topsOfFetchedEvents[order] - topsOfFetchedEvents[fEventOrderInFetched]
                        distance = finalDistance - initialDistance
                    }
                }
                return {...fEvent, distance: distance}
            })
            //disappeared
            const currentEventsWithAfterEffect = [] as TimelineEvent[]
            const afterEffectTop = 0

            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }

        const getScrollTop = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return 0
            let referTop = 0
            let fetchedEventsHeight = fetchedEvents.map(fEvent => eventBoxHeight + fEvent.overlap * overlapBottom).slice(0, fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id))
            fetchedEventsHeight.forEach(height => referTop += height)
            let topInContainer = aboveTimelineHeight + referTop
            return topInContainer - swipedEvent.top
        }

        const operateZoom = (e: WheelEvent) => {
            const depth = e.deltaX > 0 ? currentDepth -1 : currentDepth + 1
            let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e)
            let { fetchedEvents, referEvent} = fetchEventsForZoom(depth, swipedEvent, data)
            if (fetchedEvents === currentEvents) return
            let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffect(depth, swipedEvent, referEvent, fetchedEvents)
            let newScrollTop = getScrollTop(swipedEvent, referEvent, fetchedEvents)
            e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
            dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
            dispatch(updateAfterEffectTop(afterEffectTop))
            dispatch(updateScrollTop(newScrollTop))
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
            let newScrollTop = getScrollTop(scrollEvent, referEvent, fetchedEvents)
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEvents))
            dispatch(updateScrollTop(newScrollTop))
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
        <div ref={timelineRef} className='timeline flex flex-col max-w-lg relative overflow-hidden' style={{height: `${totalHeight + 20}px`}}>
            <TimelineFrame />
            <TimelineEvents />
            {/*{(lastAction === 'zoomIn' || lastAction === 'zoomOut') && <AfterEffect />}*/}
        </div>
    )
}
export default Timeline