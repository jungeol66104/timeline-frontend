import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {
    decrementDepth,
    incrementDepth,
    updateCurrentEvents,
    updateCurrentEventsWithEffect,
    updateLastAction,
    updateScrollTop
} from "@/store/slices/eventsSlice";
import gsap from 'gsap'
import events, {EventWithOrderTop, TimelineEvent} from '@/public/events'

const Timeline = ({ scrollRef }: {scrollRef: React.RefObject<HTMLDivElement>}) => {
    // refs
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
    if (lastAction === 'zoomIn' || lastAction === 'zoomOut') {
        setTimeout(() => {isScrolling = false}, 500)
    } else { isScrolling = false }
    // scroll setup
    useEffect(() => {
        const scrollWrapper = scrollRef.current
        if (!scrollWrapper) return
        scrollWrapper.scrollTop = scrollTop
    },[scrollTop])
    // swipe event handling
    useEffect(() => {
        // ref elements & null check
        const scrollWrapper = scrollRef.current
        const timeline = timelineRef.current
        if (!scrollWrapper || !timeline) return
        // functions
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent) : EventWithOrderTop => {
                let clientYInContainer = scrollWrapper.scrollTop + e.clientY
                let order = Math.floor((clientYInContainer - aboveTimelineHeight) / eventBoxHeight)
                let top = aboveTimelineHeight + order * eventBoxHeight - scrollWrapper.scrollTop
                return {...currentEvents[order], order: order, top: top}
        }
        // always start with events ordered by date
        const fetchEventsForZoom = (depth: number, swipedEvent: EventWithOrderTop, events: TimelineEvent[])  => {
            if (depth === 3 || depth === -1) {
                let fetchedEvents = currentEvents
                return {fetchedEvents, swipedEvent} as unknown as {fetchedEvents: TimelineEvent[], referEvent: EventWithOrderTop}
            }
            // initial setup
            let referEvent = swipedEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let eventsAboveTarget = events.slice(0, targetOrderInEvents)
            let eventsBelowTarget = events.slice(targetOrderInEvents + 1, )
            // when zoom out, swipedEvent disappears
            if (swipedEvent.depth > depth) {
                let rightAboveOrder = eventsAboveTarget.filter(event => event.depth <= depth).length !== 0 ? eventsAboveTarget.findLastIndex(event => event.depth <= depth) : null
                let rightBelowOrder = eventsBelowTarget.filter(event => event.depth <= depth).length !== 0 ? eventsBelowTarget.findIndex(event => event.depth <= depth) : null
                if (rightAboveOrder && rightBelowOrder) {
                    referEvent = Math.abs(rightAboveOrder - targetOrderInEvents) >= Math.abs(rightBelowOrder - targetOrderInEvents) ? {...eventsBelowTarget[rightBelowOrder], order: 0, top: 0} : {...eventsAboveTarget[rightAboveOrder], order: 0, top: 0}
                } else {referEvent = rightAboveOrder !== null ? {...eventsAboveTarget[rightAboveOrder], order: 0, top:0 } : rightBelowOrder !== null ? {...eventsBelowTarget[rightBelowOrder], order: 0, top: 0} : null as unknown as EventWithOrderTop}
                targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
                eventsAboveTarget = events.slice(0, targetOrderInEvents)
                eventsBelowTarget = events.slice(targetOrderInEvents + 1, )
            }
            // fetch above 20, below 20 from targetEvent
            let fetchedEvents: TimelineEvent[] = [referEvent]
            let eventsAboveTargetWithDepth = eventsAboveTarget.filter(event => event.depth <= depth)
            let eventsBelowTargetWithDepth = eventsBelowTarget.filter(event => event.depth <= depth)
            for (let i = eventsAboveTargetWithDepth.length-1; i >= 0 ; i--) {
                fetchedEvents.unshift(eventsAboveTargetWithDepth[i])
                if (fetchedEvents.length === 21) break
            }
            for (let i = 0; i < eventsBelowTargetWithDepth.length ; i++) {
                fetchedEvents.push(eventsBelowTargetWithDepth[i])
                if (fetchedEvents.length === 41) break
            }
            // fill 41 events
            if (fetchedEvents.length < 41) {
                for (let i = eventsAboveTargetWithDepth.length -21; i >= 0 ;i--) {
                    fetchedEvents.unshift(eventsAboveTargetWithDepth[i])
                    if (fetchedEvents.length === 41) break
                }
            }
            // disable scroll if current and fetched are the same
            if (fetchedEvents.length === currentEvents.length) {
                let fetchedIds = fetchedEvents.map(fEvent => fEvent.id)
                let currentIds = currentEvents.map(fEvent => fEvent.id)
                let isSame = !fetchedIds.some(fIds => !currentIds.includes(fIds))
                if (isSame) {
                    let fetchedEvents = currentEvents
                    return {fetchedEvents, swipedEvent} as unknown as {fetchedEvents: TimelineEvent[], referEvent: EventWithOrderTop}
                }
            }
            return {fetchedEvents, referEvent}
        }
        const fetchEventsForScroll = () => {

        }
        const getEventsWithEffect = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    let currentGap = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order
                    let newGap = i - fetchedEvents.findIndex(fEvent2 => fEvent2.id === referEvent.id)
                    return {...fEvent, distance: (currentGap - newGap) * eventBoxHeight}
                } else if (depth < currentDepth) {
                    let currentGap = fetchedEvents.findIndex(fEvent2 => fEvent2.id === referEvent.id) > fetchedEvents.findIndex(fEvent2 =>  fEvent2.id === fEvent.id) ? -1 - swipedEvent.order : currentEvents.length - swipedEvent.order
                    let newGap = i - fetchedEvents.findIndex(fEvent2 => fEvent2.id === referEvent.id)
                    return {...fEvent, distance: (currentGap - newGap) * eventBoxHeight}
                } else return fEvent
            })
            const currentEventsWithEffect = currentEvents.map(cEvent => {

            })
            return {fetchedEventsWithEffect, currentEventsWithEffect}
        }
        const getScrollTop = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return 0
            let order = fetchedEvents.findIndex(event => event.id === referEvent.id)
            let topInContainer = aboveTimelineHeight + order * eventBoxHeight
            return topInContainer - swipedEvent.top
        }
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                e.stopPropagation()

                if (!isScrolling && e.deltaX < -90) {
                    let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e)
                    let { fetchedEvents, referEvent} = fetchEventsForZoom(currentDepth + 1, swipedEvent, events)
                    if (fetchedEvents === currentEvents) return // last zoom
                    let { fetchedEventsWithEffect, currentEventsWithEffect } = getEventsWithEffect(currentDepth + 1, swipedEvent, referEvent, fetchedEvents)
                    let newScrollTop = getScrollTop(swipedEvent, referEvent, fetchedEvents)

                    dispatch(incrementDepth())
                    dispatch(updateCurrentEvents(fetchedEvents))
                    dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateLastAction('zoomIn'))
                } else if (!isScrolling && e.deltaX > 90) {
                    // refactor the whole operation into one function after incarnating scroll feature
                    let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e)
                    let { fetchedEvents, referEvent} = fetchEventsForZoom(currentDepth - 1, swipedEvent, events)
                    if (fetchedEvents === currentEvents) return // last zoom
                    let { fetchedEventsWithEffect, currentEventsWithEffect } = getEventsWithEffect(currentDepth - 1, swipedEvent, referEvent, fetchedEvents)
                    let newScrollTop = getScrollTop(swipedEvent, referEvent, fetchedEvents)
                    dispatch(decrementDepth())
                    dispatch(updateCurrentEvents(fetchedEvents))
                    dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateLastAction('zoomOut'))
                }
            }
        }
        const handleScroll = () => {
            let viewportHeight
            if (typeof window !== 'undefined') viewportHeight = window.innerHeight;

            if (scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.1) {
                let order = 0
                let top = aboveTimelineHeight + order * eventBoxHeight - scrollWrapper.scrollTop
                const scrollEvent = {...currentEvents[order], order: order, top: top }
                let { fetchedEvents, referEvent } = fetchEventsForZoom(currentDepth, scrollEvent, events)
                if (fetchedEvents === currentEvents) return
                let newScrollTop = getScrollTop(scrollEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateLastAction('scroll'))
            }
            if (scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.9 - (viewportHeight as number)) {
                let order = currentEvents.length - 1
                let top = aboveTimelineHeight + order * eventBoxHeight - scrollWrapper.scrollTop
                const scrollEvent = {...currentEvents[order], order: order, top: top }
                let { fetchedEvents, referEvent } = fetchEventsForZoom(currentDepth, scrollEvent, events)
                if (fetchedEvents === currentEvents) return
                let newScrollTop = getScrollTop(scrollEvent, referEvent, fetchedEvents)
                dispatch(updateCurrentEvents(fetchedEvents))
                dispatch(updateCurrentEventsWithEffect(fetchedEvents))
                dispatch(updateScrollTop(newScrollTop))
                dispatch(updateLastAction('scroll'))
            }
        }
        timeline.addEventListener('wheel' , handleWheel);
        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            scrollWrapper.removeEventListener('scroll', handleScroll)
        };
    });
    return (
        <div ref={timelineRef} className='ml-5 mr-5 mb-2.5 h-max max-w-lg'>
            <BodyLine />
            {currentEventsWithEffect.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
        </div>
    )
}
export default Timeline

const BodyLine = () => {
    const currentEvents = useSelector((state: RootState) => state.reducer.events.currentEvents)

    return (
        <div className={`w-3 h-2.5 relative animate-fadeIn`}>
            <div className={`absolute w-0.5 bg-gray-400 left-1/2`} style={{height: `${currentEvents.length * 122 + 20}px`, transform:'translate(-50%,-0)'}}></div>
            <div className={`absolute w-0.5 bg-gray-600 left-1/2 top-[15px]`} style={{height: `${currentEvents.length * 122 - 10}px`, transform:'translate(-50%,-0)'}}></div>
        </div>
    )
}
const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    let animation =  event.distance !== undefined ? '' : 'animate-fadeIn'

    // transition effect for remained events
    useEffect(() => {
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    });
    return (
        <div ref={eventBoxRef} className={`flex pt-[5px] pb-[5px] ${animation}`}>
            <EventNode />
            <EventContent event={event}/>
        </div>
    )
}
const EventNode = () => {
    return (
        <div className='w-3 mr-2.5 z-10'>
            <div className='w-3 h-3 bg-white mr-2.5 border-2 rounded-full border-gray-600'></div>
        </div>
    )
}
const EventContent = ({event} : {event: TimelineEvent}) => {
    return (
        <div className="w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5">
            <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
            <div className={'mt-0.5 font-black'}>{event.title}</div>
            <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'}>{event.content}</div>
        </div>
    )
}