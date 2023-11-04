import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {TimelineEvent} from '@/public/events'
import {sum, julianDateToEvent, getEventHeights} from '@/utils/global'
import {selectCurrentEvents, selectCurrentEventsWithEffect, selectCurrentTimeline, selectData, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect} from "@/store/slices/eventsSlice";
import {decrementDepth, incrementDepth, selectCurrentDepth, selectLastAction, selectScrollTop, updateAfterEffectTop, updateCurrentDepth, updateLastAction, updateScrollTop, updateTotalHeight} from "@/store/slices/effectsSlice";
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
    const currentEventsWithEffect = useSelector(selectCurrentEventsWithEffect)
    const data = useSelector(selectData)
    const currentDepth = useSelector(selectCurrentDepth)
    const scrollTop = useSelector(selectScrollTop)
    const lastAction = useSelector(selectLastAction)

    const aboveTimelineHeight = 70
    const eventBoxHeight = 124
    const overlapBottom = 6

    // prevents additional zoom
    let isZooming = true
    if (lastAction === 'zoomIn' || lastAction === 'zoomOut') {setTimeout(() => {isZooming = false}, 500)}
    else {isZooming = false}

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

        const fetchEventsForZoom = (depth: number, swipedEvent: TimelineEvent, events: TimelineEvent[]) => {
            if (depth === 3 || depth === -1) return {fetchedEvents: currentEvents, referEvent: swipedEvent}
            // initial setup
            let referEvent = swipedEvent
            // need to exclude same date events of referEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let eventsAboveTarget = events.slice(0, targetOrderInEvents).filter(event => event.julianDate !== referEvent.julianDate)
            let eventsBelowTarget = events.slice(targetOrderInEvents + 1, ).filter(event => event.julianDate !== referEvent.julianDate)
            // zoomOut & swipedEvent disappeared
            if (swipedEvent.depth as number > depth) {
                let rightAboveDate = eventsAboveTarget.findLast(event => event.depth as number <= depth)?.julianDate
                let rightBelowDate = eventsBelowTarget.find(event => event.depth as number <= depth)?.julianDate
                if (rightAboveDate && rightBelowDate) {referEvent = Math.abs(referEvent.julianDate - rightAboveDate) >= Math.abs(referEvent.julianDate - rightBelowDate) ? {...julianDateToEvent(rightBelowDate, events), order: 0, top: 0} : {...julianDateToEvent(rightAboveDate, events), order: 0, top: 0}}
                else {referEvent = rightAboveDate !== undefined ? {...julianDateToEvent(rightAboveDate, events), order: 0, top: 0} : rightBelowDate !== undefined ? {...julianDateToEvent(rightBelowDate, events), order: 0, top: 0} : null as unknown as TimelineEvent}
                targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
                eventsAboveTarget = events.slice(0, targetOrderInEvents).filter(event => event.julianDate !== referEvent.julianDate)
                eventsBelowTarget = events.slice(targetOrderInEvents + 1, ).filter(event => event.julianDate !== referEvent.julianDate)
            }
            let fetchedEvents: TimelineEvent[] = [referEvent]
            let julianDatesAboveTargetWithDepth = Array.from(new Set(eventsAboveTarget.filter(event => event.depth as number<= depth).map(event => event.julianDate)))
            let julianDatesBelowTargetWithDepth = Array.from(new Set(eventsBelowTarget.filter(event => event.depth as number<= depth).map(event => event.julianDate)))
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
            try {
                const response = await api.post('/v1/getTimeline', {'timelineId': currentTimeline.id , 'depth': currentDepth, 'pivotJulianDate': pivotEvent.julianDate})
                let fetchedEvents = response.data.data.events as TimelineEvent[]
                fetchedEvents = fetchedEvents.map(fEvent => {
                    const cEvent = currentEvents.find(cEvent => cEvent.id === fEvent.id)
                    if (cEvent) return cEvent
                    else return fEvent
                })
                const referEvent = fetchedEvents.find(fEvent => fEvent.id === response.data.data.pivotEventId)
                return {fetchedEvents, referEvent} // referEvent too
            } catch (error) {
                console.error('Error fetching initial data during SSR:', error);
                return {fetchedEvents: currentEvents, referEvent: pivotEvent }
            }
        }

        const getEventsWithEffectTest = (depth: number, swipedEvent: TimelineEvent, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
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

        const operateZoom = (e: WheelEvent | TouchEvent | MouseEvent, deltaX? : number) => {
            let depth
            if (e instanceof WheelEvent) {
                depth = e.deltaX > 0 ? currentDepth - 1 : currentDepth + 1
            } else {
                if (!deltaX) return
                depth = deltaX < 0 ? currentDepth -1 : currentDepth + 1
            }
            let swipedEvent: TimelineEvent = getSwipedEvent(scrollWrapper, e)
            let { fetchedEvents, referEvent} = fetchEventsForZoom(depth, swipedEvent, data)
            if (fetchedEvents === currentEvents) return
            let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffectTest(depth, swipedEvent, referEvent, fetchedEvents)
            let {newScrollTop, totalHeight} = getScrollTop(swipedEvent, referEvent, fetchedEvents)

            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
            dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
            dispatch(updateAfterEffectTop(afterEffectTop))
            dispatch(updateScrollTop(newScrollTop))
            dispatch(updateTotalHeight(totalHeight))
            if (e instanceof WheelEvent) {
                e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
                e.deltaX > 0 ? dispatch(updateLastAction('zoomOut')) : dispatch(updateLastAction('zoomIn'))
            } else {
                if (!deltaX) return
                deltaX < 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
                deltaX < 0 ? dispatch(updateLastAction('zoomOut')) : dispatch(updateLastAction('zoomIn'))
            }
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
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                if (!isZooming && Math.abs(e.deltaX) > 90) {operateZoom(e)}
            }
        }

        const handleTouch = (e: TouchEvent) => {
            if (e.type === 'touchstart') {
                startX = e.touches[0].clientX;
            } else if (e.type === 'touchend' && startX !== null) {
                const endX = e.changedTouches[0].clientX;
                const deltaX = endX - startX;
                if (deltaX !== 0) {
                    e.preventDefault()
                    if (!isZooming && Math.abs(deltaX) > 50) {operateZoom(e, deltaX)}
                }
            }
        }

        const handleDrag = (e: MouseEvent) => {
            if (e.type === 'mousedown') {
                startX = e.clientX;
            } else if (e.type === 'mousemove' && startX){
                const endX = e.clientX;
                const deltaX = endX - startX
                if (!isZooming && Math.abs(deltaX) > 50) {operateZoom(e, deltaX)}
            } else {
                startX = null
            }
        }
        // const handleKeyDown = () => {
        //
        // }
        const handleScroll = () => {
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            if (!viewportHeight) return
            let scrollUp = scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.1
            let scrollDown = scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.9 - viewportHeight
            if (scrollUp || scrollDown) {operateScroll(scrollUp)}
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
            {(lastAction === 'zoomIn' || lastAction === 'zoomOut') && <AfterEffectEvents />}
        </div>
    )
}
export default Timeline