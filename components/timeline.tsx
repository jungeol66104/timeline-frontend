import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {decrementDepth, incrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updatePrevEventsWithEffect, updateLastAction, updateScrollTop} from "@/store/slices/eventsSlice";
import gsap from 'gsap'
import events, {EventWithOrderTop, TimelineEvent} from '@/public/events'

const Timeline = ({ scrollRef }: {scrollRef: React.RefObject<HTMLDivElement>}) => {
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
    // swipe event handling
    useEffect(() => {
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
            if (depth === 3 || depth === -1) return {fetchedEvents: currentEvents, referEvent: swipedEvent}
            // initial setup
            let referEvent = swipedEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let eventsAboveTarget = events.slice(0, targetOrderInEvents)
            let eventsBelowTarget = events.slice(targetOrderInEvents + 1, )
            // zoomOut & swipedEvent disappears
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
            // fetch above 20, below 20 from targetEvent & fill 41
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
        const fetchEventsForScroll = (scrollEvent: EventWithOrderTop, events: TimelineEvent[]) => {
            // initial setup
            let referEvent = scrollEvent
            let targetOrderInEvents = events.findIndex(event => event.id === referEvent.id)
            let addedEvents: TimelineEvent[] = []
            let fetchedEvents = [...currentEvents]
            if (scrollEvent.order === 0) {
                let eventsAboveTargetWithDepth = events.slice(0, targetOrderInEvents).filter(event => event.depth === currentDepth)
                for(let i = eventsAboveTargetWithDepth.length - 1 ; i >= 0 ; i--) {
                    addedEvents.unshift(eventsAboveTargetWithDepth[i])
                    if (addedEvents.length === 21) break
                }
                fetchedEvents.unshift(...addedEvents)
                fetchedEvents = fetchedEvents.slice(0, fetchedEvents.length - addedEvents.length)
            }
            if (scrollEvent.order === currentEvents.length - 1) {
                let eventsBelowTargetWithDepth = events.slice(targetOrderInEvents + 1, ).filter(event => event.depth === currentDepth)
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
        const getEventsWithEffect = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            let order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                if (currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    let currentGap = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order
                    let newGap = i - order
                    return {...fEvent, distance: (currentGap - newGap) * eventBoxHeight}
                } else if (depth < currentDepth) {
                    let currentGap = order > fetchedEvents.findIndex(fEvent2 =>  fEvent2.id === fEvent.id) ? -1 - swipedEvent.order : currentEvents.length - swipedEvent.order
                    let newGap = i - order
                    return {...fEvent, distance: (currentGap - newGap) * eventBoxHeight}
                } else return fEvent
            })
            const currentEventsWithAfterEffect = currentEvents.map(cEvent => {
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    if (depth > currentDepth) {
                        let currentGap = currentEvents.findIndex(cEvent2 => cEvent2.id === cEvent.id) - swipedEvent.order
                        let newGap = currentEvents.findIndex(cEvent2 => cEvent2.id === swipedEvent.id) > currentEvents.findIndex(cEvent2 => cEvent2.id === cEvent.id) ? -1 - order : fetchedEvents.length - order
                        return {...cEvent, distance: (newGap - currentGap) * eventBoxHeight}
                    } else return {...cEvent, fadeout: true}
                } else return cEvent
            })
            const fetchedEventsWithAfterEffect = fetchedEvents.map((fEvent, i) => {
                let newGap = i - order
                let orderInCurrent = currentEventsWithAfterEffect.findIndex(cEvent => cEvent.id === swipedEvent.id) + newGap
                let eventInCurrent: TimelineEvent = currentEventsWithAfterEffect[orderInCurrent]
                if(eventInCurrent && (eventInCurrent.fadeout || eventInCurrent.distance)) return eventInCurrent
                else return fEvent
            })
            return {fetchedEventsWithEffect, fetchedEventsWithAfterEffect}
        }
        const getScrollTop = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return 0
            let order = fetchedEvents.findIndex(event => event.id === referEvent.id)
            let topInContainer = aboveTimelineHeight + order * eventBoxHeight
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
        const operateScroll = (scrollUp: boolean, scrollDown: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            let top = aboveTimelineHeight + order * eventBoxHeight - scrollWrapper.scrollTop
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
                e.stopPropagation()
                if (!isScrolling && Math.abs(e.deltaX) > 90) {operateZoom(e)}
            }
        }
        const handleScroll = () => {
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            let scrollUp = scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.1
            let scrollDown = scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.9 - (viewportHeight as number)
            if (scrollUp || scrollDown) {operateScroll(scrollUp, scrollDown)}
        }

        timeline.addEventListener('wheel' , handleWheel);
        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            scrollWrapper.removeEventListener('scroll', handleScroll)
        };
    });
    return (
        <div ref={timelineRef} className='ml-5 mr-5 mb-2.5 h-max max-w-lg relative'>
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
    return <div className={`w-3 h-2.5 relative animate-fadeIn`}><div className={`absolute w-0.5 bg-gray-600 left-1/2`} style={{height: `${currentEvents.length * eventBoxHeight + 20}px`, transform:'translate(-50%,-0)'}}></div></div>
}
const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    let animation = event.fadeout ? 'animate-fadeOut' : event.distance !== undefined ? '' :'animate-fadeIn'
    let zIndex = event.fadeout || animation === 'animate-fadeIn' ? '' : 'z-20'
    useEffect(() => {
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
        <div className="w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5">
            <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
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
                    return <EventBox key={event.id} event={event} />
                } return <BlankBox key={event.id} />
            })}
        </div>
    )
}
const BlankBox = () => {
    return <div className={`pt-[5px] pb-[5px]`} style={{transform:'translate(0,-0)'}}><div className={'h-28'}></div></div>
}