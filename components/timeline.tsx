import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {
    decrementDepth,
    incrementDepth,
    updateCurrentEvents,
    updateCurrentEventsWithEffect,
    updateLastAction,
    updatePrevEventsWithEffect,
    updateScrollTop,
    updateAfterEffectTop
} from "@/store/slices/eventsSlice";
import gsap from 'gsap'
import events, {EventWithOrderTop, TimelineEvent} from '@/public/events'
import {current} from "immer";

const Timeline = ({ scrollRef }: {scrollRef: RefObject<HTMLDivElement>}) => {
    // console.log(Array.from(new Set(events.map(event => event.julianDate))).length)
    // ref
    const timelineRef: RefObject<HTMLDivElement> = useRef(null)
    // redux
    const dispatch = useDispatch()
    const currentDepth = useSelector((state: RootState) => state.reducer.events.currentDepth)
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const currentEventsWithEffect = useSelector((state: RootState) => state.reducer.events.currentEventsWithEffect)
    const scrollTop = useSelector((state: RootState) => state.reducer.events.scrollTop)
    const lastAction = useSelector((state: RootState) => state.reducer.events.lastAction)
    // vars
    const aboveTimelineHeight = 70
    const eventBoxHeight = 122
    // prevents additional zoom
    let isScrolling = true
    if (lastAction === 'zoomIn' || lastAction === 'zoomOut') {setTimeout(() => {isScrolling = false}, 500)}
    else { isScrolling = false }
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
        // functions
        const julianDateToEvent = (julianDate: number, events: TimelineEvent[]): TimelineEvent => {
            let julianDateEvents = events.filter(event => event.julianDate === julianDate)
            let overlap = julianDateEvents.length - 1
            if (overlap > 2) overlap = 2
            let lowestDepth = Math.min(...julianDateEvents.map(jEvent => jEvent.depth))
            return {...julianDateEvents.find(jEvent => jEvent.depth === lowestDepth), overlap: overlap} as TimelineEvent
        }
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent) : EventWithOrderTop => {
            let clientYInContainer = scrollWrapper.scrollTop + e.clientY
            let order = Math.floor((clientYInContainer - aboveTimelineHeight) / eventBoxHeight)
            let top = aboveTimelineHeight + order * eventBoxHeight - scrollWrapper.scrollTop
            return {...currentEvents[order], order: order, top: top}
        }
        const getSwipedEventTest = (scrollWrapper: HTMLDivElement, e: WheelEvent) : EventWithOrderTop => {
            let clientYInContainer = scrollWrapper.scrollTop + e.clientY
            let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * 5)
            let arrayOfTop = arrayOfHeight.map((height, i) => {
                let sum = 0
                arrayOfHeight.slice(0,i).forEach(height2 => sum += height2)
                return sum
            })
            let order = arrayOfTop.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
            let top = arrayOfTop[order] + aboveTimelineHeight - scrollWrapper.scrollTop
            return {...currentEvents[order], order: order, top: top}
        }
        const fetchEventsForZoom = (depth: number, swipedEvent: EventWithOrderTop, events: TimelineEvent[])  => {
            if (depth === 3 || depth === -1) return {fetchedEvents: currentEvents, referEvent: swipedEvent}
            // initial setup
            let referEvent = swipedEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let eventsAboveTarget = events.slice(0, targetOrderInEvents)
            let eventsBelowTarget = events.slice(targetOrderInEvents + 1, )
            // zoomOut & swipedEvent disappeared
            if (swipedEvent.depth > depth) {
                let rightAboveOrder = eventsAboveTarget.filter(event => event.depth <= depth).length !== 0 ? eventsAboveTarget.findLastIndex(event => event.depth <= depth) : null
                let rightBelowOrder = eventsBelowTarget.filter(event => event.depth <= depth).length !== 0 ? eventsBelowTarget.findIndex(event => event.depth <= depth) : null
                // is EventWithOrderTop type really needed? it is useless in this situation
                if (rightAboveOrder && rightBelowOrder) {referEvent = Math.abs(rightAboveOrder - targetOrderInEvents) >= Math.abs(rightBelowOrder - targetOrderInEvents) ? {...eventsBelowTarget[rightBelowOrder], order: 0, top: 0} : {...eventsAboveTarget[rightAboveOrder], order: 0, top: 0}}
                else {referEvent = rightAboveOrder !== null ? {...eventsAboveTarget[rightAboveOrder], order: 0, top:0 } : rightBelowOrder !== null ? {...eventsBelowTarget[rightBelowOrder], order: 0, top: 0} : null as unknown as EventWithOrderTop}
                targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
                eventsAboveTarget = events.slice(0, targetOrderInEvents)
                eventsBelowTarget = events.slice(targetOrderInEvents + 1, )
            }
            // fetch above 20, below 20 from targetEvent & fill 41, use dates here
            let fetchedEvents: TimelineEvent[] = [referEvent]
            let eventsAboveTargetWithDepth = eventsAboveTarget.filter(event => event.depth <= depth)
            let eventsBelowTargetWithDepth = eventsBelowTarget.filter(event => event.depth <= depth)
            for (let i = eventsAboveTargetWithDepth.length - 1 ; i >= 0 ; i--) {
                fetchedEvents.unshift(eventsAboveTargetWithDepth[i])
                if (fetchedEvents.length === 21) break
            }
            for (let i = 0 ; i < eventsBelowTargetWithDepth.length ; i++) {
                fetchedEvents.push(eventsBelowTargetWithDepth[i])
                if (fetchedEvents.length === 41) break
            }
            if (fetchedEvents.length < 41) {
                for (let i = eventsAboveTargetWithDepth.length - 21 ; i >= 0 ; i--) {
                    fetchedEvents.unshift(eventsAboveTargetWithDepth[i])
                    if (fetchedEvents.length === 41) break
                }
            }
            return {fetchedEvents, referEvent}
        }
        const fetchEventsForZoomTest = (depth: number, swipedEvent: EventWithOrderTop, events: TimelineEvent[]) => {
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
            return {fetchedEvents, referEvent}
        }
        const fetchEventsForScroll = (scrollEvent: EventWithOrderTop, events: TimelineEvent[]) => {
            let referEvent = scrollEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let addedEvents: TimelineEvent[] = []
            let fetchedEvents = [...currentEventsWithEffect]
            if (scrollEvent.order === 0) {
                let eventsAboveTargetWithDepth = events.slice(0, targetOrderInEvents).filter(event => event.depth <= currentDepth)
                for(let i = eventsAboveTargetWithDepth.length - 1 ; i >= 0 ; i--) {
                    addedEvents.unshift(eventsAboveTargetWithDepth[i])
                    if (addedEvents.length === 21) break
                }
                fetchedEvents.unshift(...addedEvents)
                fetchedEvents = fetchedEvents.slice(0, fetchedEvents.length - addedEvents.length)
            }
            if (scrollEvent.order === currentEvents.length - 1) {
                let eventsBelowTargetWithDepth = events.slice(targetOrderInEvents + 1, ).filter(event => event.depth <= currentDepth)
                for (let i = 0 ; i < eventsBelowTargetWithDepth.length ; i++) {
                    addedEvents.push(eventsBelowTargetWithDepth[i])
                    if (addedEvents.length === 21) break
                }
                fetchedEvents.push(...addedEvents)
                fetchedEvents = fetchedEvents.slice(addedEvents.length, )
            }
            if (addedEvents.length === 0) return {fetchedEvents: currentEvents, referEvent:  scrollEvent}
            return {fetchedEvents, referEvent}
        }
        const fetchEventsForScrollTest = (scrollEvent: EventWithOrderTop, events: TimelineEvent[]) => {
            let referEvent = scrollEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let addedEvents: TimelineEvent[] = []
            let fetchedEvents = [...currentEventsWithEffect]
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
            if (addedEvents.length === 0) return {fetchedEvents: currentEvents, referEvents: scrollEvent}
            return {fetchedEvents, referEvent}
        }
        const getEventsWithEffect = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            let order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    let currentGap = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order
                    let newGap = i - order
                    return {...fEvent, distance: (currentGap - newGap) * eventBoxHeight}
                } else if (depth < currentDepth) {
                    let currentGap = order > i ? -1 - swipedEvent.order : currentEvents.length - swipedEvent.order
                    let newGap = i - order
                    return {...fEvent, distance: (currentGap - newGap) * eventBoxHeight}
                } else return fEvent
            })
            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    if (depth > currentDepth) {
                        let currentGap = i - swipedEvent.order
                        let newGap = swipedEvent.order > i ? -1 - order : fetchedEvents.length - order
                        return {...cEvent, distance: (newGap - currentGap) * eventBoxHeight}
                    } else return {...cEvent, fadeout: true}
                } else return cEvent
            })
            // use currentEventsWithAfterEffect and adjust top for AfterEffect in order to sync with fetchedEvents
            const fetchedEventsWithAfterEffect = fetchedEvents.map((fEvent, i) => {
                let newGap = i - order
                let orderInCurrent = swipedEvent.order + newGap
                let eventInCurrent: TimelineEvent = currentEventsWithAfterEffect[orderInCurrent]
                if(eventInCurrent && (eventInCurrent.fadeout || eventInCurrent.distance)) return eventInCurrent
                else return fEvent
            })
            return {fetchedEventsWithEffect, fetchedEventsWithAfterEffect}
        }
        const getEventsWithEffectTest = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            referEvent.order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                if(currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    if (depth > currentDepth) {
                        let initialOrder = (referEvent.order as number) + (currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order)
                        let finalOrder = i
                        if (initialOrder >= finalOrder) {for (let o = initialOrder; o > finalOrder ; o--) {distance += eventBoxHeight + fetchedEvents[o].overlap * 5}}
                        else {for (let o = initialOrder; o < finalOrder ; o++) {distance -= eventBoxHeight + fetchedEvents[o].overlap * 5}}
                    } else {
                        let initialOrder = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                        let finalOrder = swipedEvent.order + (i - (referEvent.order as number))
                        if (initialOrder <= finalOrder) {for (let o = finalOrder; o > initialOrder ; o--) {distance -= eventBoxHeight + currentEvents[o].overlap * 5}}
                        else {for (let o = finalOrder; o < initialOrder ; o++) {distance += eventBoxHeight + currentEvents[o].overlap * 5}}
                    }
                } else {
                    if (depth > currentDepth) return fEvent
                    else {
                        let initialOrder = i < (referEvent.order as number) ? -1 : currentEvents.length
                        let finalOrder = swipedEvent.order + (i - (referEvent.order as number))
                        if (initialOrder <= finalOrder) {for (let o = finalOrder; o > initialOrder ; o--) {distance -= eventBoxHeight + currentEvents[o].overlap * 5}}
                        else {for (let o = finalOrder; o < initialOrder ; o++) {distance += eventBoxHeight + currentEvents[o].overlap * 5}}
                    }
                }
                return {...fEvent, distance: distance}
            })
            const currentEventsWithAfterEffect = currentEvents.map((cEvent, i) => {
                let distance = 0
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    if (depth > currentDepth) {
                        let initialOrder = (referEvent.order as number) + (i - swipedEvent.order)
                        let finalOrder = i < swipedEvent.order ? -1 : fetchedEvents.length
                        if (initialOrder >= finalOrder) {for (let o = initialOrder ; o > finalOrder ; i--) {distance -= eventBoxHeight + fetchedEvents[i].overlap * 5}}
                        else {for (let o = initialOrder; o < finalOrder; i++) {distance += eventBoxHeight + fetchedEvents[i].overlap * 5}}
                    }
                } else return cEvent
                return {...cEvent, distance: distance}
            })
            let referTop = 0
            let swipedTop = 0
            let fetchedEventsHeight = fetchedEvents.map(fEvent => eventBoxHeight + fEvent.overlap * 5).slice(0, referEvent.order)
            let currentEventsHeight = currentEvents.map(cEvent => eventBoxHeight + cEvent.overlap * 5).slice(0, swipedEvent.order)
            fetchedEventsHeight.forEach(height => referTop += height)
            currentEventsHeight.forEach(height => swipedTop += height)
            const afterEffectTop = referTop - swipedTop
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }
        const getScrollTop = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return 0
            // order is reused a lot
            let order = fetchedEvents.findIndex(event => event.id === referEvent.id)
            let topInContainer = aboveTimelineHeight + order * eventBoxHeight
            return topInContainer - swipedEvent.top
        }
        const getScrollTopTest = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return 0
            let referTop = 0
            let fetchedEventsHeight = fetchedEvents.map(fEvent => eventBoxHeight + fEvent.overlap * 5).slice(0, fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id))
            fetchedEventsHeight.forEach(height => referTop += height)
            let topInContainer = aboveTimelineHeight + referTop
            return topInContainer - swipedEvent.top
        }
        const operateZoom = (e: WheelEvent)=> {
            const depth = e.deltaX > 0 ? currentDepth -1 : currentDepth + 1
            let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e)
            let { fetchedEvents, referEvent} = fetchEventsForZoom(depth, swipedEvent, events)
            if (fetchedEvents === currentEvents) return
            let { fetchedEventsWithEffect, fetchedEventsWithAfterEffect } = getEventsWithEffect(depth, swipedEvent, referEvent, fetchedEvents)
            let newScrollTop = getScrollTop(swipedEvent, referEvent, fetchedEvents)
            e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
            dispatch(updatePrevEventsWithEffect(fetchedEventsWithAfterEffect))
            dispatch(updateScrollTop(newScrollTop))
            e.deltaX > 0 ? dispatch(updateLastAction('zoomOut')) : dispatch(updateLastAction('zoomIn'))
        }
        const operateScroll = (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            //this code below can be generalized in the future
            let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * 5)
            let arrayOfTop = arrayOfHeight.map((height, i) => {
                let sum = 0
                arrayOfHeight.slice(0,i).forEach(height2 => sum += height2)
                return sum
            })
            let top = aboveTimelineHeight + arrayOfTop[order] - scrollWrapper.scrollTop
            const scrollEvent = {...currentEvents[order], order: order, top: top }
            let { fetchedEvents, referEvent } = fetchEventsForScroll(scrollEvent, events)
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
        <div ref={timelineRef} className='h-max max-w-lg relative'>
            <BodyLine />
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
            {(lastAction === 'zoomIn' || lastAction === 'zoomOut') && <AfterEffect />}
        </div>
    )
}
export default Timeline

const BodyLine = () => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)
    const eventBoxHeight = 122
    let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * 5)
    let totalHeight = 0
    arrayOfHeight.forEach(height => totalHeight += height)
    return <div className={`w-3 h-2.5 relative animate-fadeIn`}><div className={`absolute w-0.5 bg-gray-600 left-1/2`} style={{height: `${currentEvents.length * eventBoxHeight + 20}px`, transform:'translate(-50%,-0)'}}></div></div>
}
const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)

    const lastAction = useSelector((state: RootState) => state.reducer.events.lastAction)

    let animation = event.fadeout ? 'animate-fadeOut' : event.distance !== undefined ? '' :'animate-fadeIn'
    let zIndex = event.fadeout || animation === 'animate-fadeIn' ? '' : 'z-20'

    useEffect(() => {
        if (lastAction === 'scroll') return
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    })

    return (
        <div ref={eventBoxRef} className={`relative flex pt-[5px] pb-[5px] ${animation} ${zIndex}`}>
            <EventNode />
            <EventContent event={event}/>
        </div>
    )
}
const EventNode = () => {
    return <div className='w-3 mr-2.5 z-10'><div className='w-3 h-3 bg-white mr-2.5 border-2 rounded-full border-gray-600'></div></div>
}
const EventContent = ({event} : {event: TimelineEvent}) => {
    return (
        <div className="relative w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5">
            <div className={'flex gap-2.5'}>
                <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
                <div className={'text-[12px] text-gray-500'}>#전쟁</div>
            </div>
            <div className={'mt-0.5 font-black'}>{event.title}</div>
            <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'}>{event.content}</div>
        </div>
    )
}
const AfterEffect = () => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    return (
        <div className={'absolute top-2.5 left-0'}>
            {prevEventsWithEffect.map((event: TimelineEvent) => {
                if (event.fadeout || event.distance) {
                    return <AfterEventBox key={event.id} event={event} />
                } return <BlankBox key={event.id} />
            })}
        </div>
    )
}
const BlankBox = () => {
    return <div className={`pt-[5px] pb-[5px]`} style={{transform:'translate(0,-0)'}}><div className={'h-28'}></div></div>
}
const AfterEventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    let zIndex = event.fadeout ? '' : 'z-20'
    useEffect(() => {
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    })
    return (
        <div ref={eventBoxRef} className={`relative flex pt-[5px] pb-[5px] animate-fadeOut ${zIndex}`}>
            <EventNode />
            <EventContent event={event}/>
        </div>
    )
}