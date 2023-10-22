import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {decrementDepth, incrementDepth, updateCurrentEvents, updateCurrentEventsWithEffect, updateLastAction, updatePrevEventsWithEffect, updateScrollTop, updateAfterEffectTop} from "@/store/slices/eventsSlice";
import gsap from 'gsap'
import {EventWithOrderTop, TimelineEvent} from '@/public/events'
// global function
const sum = (array: number[]) => {
    let sum = 0
    array.forEach(l => sum += l)
    return sum
}
const Timeline = ({ data, initialData, scrollRef }: {data: TimelineEvent[], initialData: TimelineEvent[], scrollRef: RefObject<HTMLDivElement>}) => {
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
    const eventBoxHeight = 124
    const overlapBottom = 6
    const arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * overlapBottom)
    const totalHeight = sum(arrayOfHeight)
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
        // functions
        const julianDateToEvent = (julianDate: number, events: TimelineEvent[]): TimelineEvent => {
            let julianDateEvents = events.filter(event => event.julianDate === julianDate)
            let overlap = julianDateEvents.length - 1
            if (overlap > 2) overlap = 2
            let lowestDepth = Math.min(...julianDateEvents.map(jEvent => jEvent.depth))
            return {...julianDateEvents.find(jEvent => jEvent.depth === lowestDepth), overlap: overlap} as TimelineEvent
        }
        const getSwipedEventTest = (scrollWrapper: HTMLDivElement, e: WheelEvent) : EventWithOrderTop => {
            let clientYInContainer = scrollWrapper.scrollTop + e.clientY
            let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * overlapBottom)
            let arrayOfTop = arrayOfHeight.map((height, i) => sum(arrayOfHeight.slice(0,i)))
            let order = arrayOfTop.findLastIndex(top => top < clientYInContainer - aboveTimelineHeight)
            let top = arrayOfTop[order] + aboveTimelineHeight - scrollWrapper.scrollTop
            return {...currentEvents[order], order: order, top: top}
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
            if (addedEvents.length === 0) return {fetchedEvents: currentEvents, referEvent: scrollEvent}
            return {fetchedEvents, referEvent}
        }
        const getEventsWithEffectTest = (depth: number, swipedEvent: EventWithOrderTop, referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            const order = fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
            const fetchedEventsWithEffect = fetchedEvents.map((fEvent, i) => {
                let distance = 0
                if(currentEvents.find(cEvent => cEvent.id === fEvent.id)) {
                    if (depth > currentDepth) {
                        let initialOrder = order + (currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order)
                        let finalOrder = i
                        if (initialOrder >= finalOrder) {for (let o = initialOrder; o > finalOrder ; o--) {distance += eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                        else {for (let o = initialOrder; o < finalOrder ; o++) {distance -= eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                    } else {
                        let initialOrder = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id)
                        let finalOrder = swipedEvent.order + (i - order)
                        if (initialOrder <= finalOrder) {for (let o = finalOrder; o > initialOrder ; o--) {distance -= eventBoxHeight + currentEvents[o].overlap * overlapBottom}}
                        else {for (let o = finalOrder; o < initialOrder ; o++) {distance += eventBoxHeight + currentEvents[o].overlap * overlapBottom}}
                    }
                } else {
                    if (depth > currentDepth) return fEvent
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
                if (!fetchedEvents.find(fEvent => fEvent.id === cEvent.id)) {
                    if (depth > currentDepth) {
                        let initialOrder = order + (i - swipedEvent.order)
                        let finalOrder = i < swipedEvent.order ? -1 : fetchedEvents.length
                        if (initialOrder >= finalOrder) {for (let o = initialOrder ; o > finalOrder ; o--) {distance -= eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                        else {for (let o = initialOrder; o < finalOrder; o++) {distance += eventBoxHeight + fetchedEvents[o].overlap * overlapBottom}}
                    } else return {...cEvent, fadeout: true}
                } else return cEvent
                return {...cEvent, distance: distance}
            })
            let referTop = 0
            let swipedTop = 0
            let fetchedEventsHeight = fetchedEvents.map(fEvent => eventBoxHeight + fEvent.overlap * overlapBottom).slice(0, order)
            let currentEventsHeight = currentEvents.map(cEvent => eventBoxHeight + cEvent.overlap * overlapBottom).slice(0, swipedEvent.order)
            fetchedEventsHeight.forEach(height => referTop += height)
            currentEventsHeight.forEach(height => swipedTop += height)
            const afterEffectTop = referTop - swipedTop
            return {fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop}
        }
        const getScrollTopTest = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            if (!swipedEvent.top) return 0
            let referTop = 0
            let fetchedEventsHeight = fetchedEvents.map(fEvent => eventBoxHeight + fEvent.overlap * overlapBottom).slice(0, fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id))
            fetchedEventsHeight.forEach(height => referTop += height)
            let topInContainer = aboveTimelineHeight + referTop
            return topInContainer - swipedEvent.top
        }
        const operateZoomTest = (e: WheelEvent) => {
            const depth = e.deltaX > 0 ? currentDepth -1 : currentDepth + 1
            let swipedEvent: EventWithOrderTop = getSwipedEventTest(scrollWrapper, e)
            let { fetchedEvents, referEvent} = fetchEventsForZoomTest(depth, swipedEvent, data)
            if (fetchedEvents === currentEvents) return
            let { fetchedEventsWithEffect, currentEventsWithAfterEffect, afterEffectTop } = getEventsWithEffectTest(depth, swipedEvent, referEvent, fetchedEvents)
            let newScrollTop = getScrollTopTest(swipedEvent, referEvent, fetchedEvents)
            e.deltaX > 0 ? dispatch(decrementDepth()) : dispatch(incrementDepth())
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEventsWithEffect))
            dispatch(updatePrevEventsWithEffect(currentEventsWithAfterEffect))
            dispatch(updateAfterEffectTop(afterEffectTop))
            dispatch(updateScrollTop(newScrollTop))
            e.deltaX > 0 ? dispatch(updateLastAction('zoomOut')) : dispatch(updateLastAction('zoomIn'))
        }
        const operateScrollTest = (scrollUp: boolean) => {
            let order =  scrollUp ? 0 : currentEvents.length - 1
            //this code below can be generalized in the future
            let arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * overlapBottom)
            let arrayOfTop = arrayOfHeight.map((height, i) => sum(arrayOfHeight.slice(0,i)))
            let top = aboveTimelineHeight + arrayOfTop[order] - scrollWrapper.scrollTop
            const scrollEvent = {...currentEvents[order], order: order, top: top }
            let { fetchedEvents, referEvent } = fetchEventsForScrollTest(scrollEvent, data)
            if (fetchedEvents === currentEvents) return
            let newScrollTop = getScrollTopTest(scrollEvent, referEvent, fetchedEvents)
            dispatch(updateCurrentEvents(fetchedEvents))
            dispatch(updateCurrentEventsWithEffect(fetchedEvents))
            dispatch(updateScrollTop(newScrollTop))
            dispatch(updateLastAction('scroll'))
        }
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                if (!isScrolling && Math.abs(e.deltaX) > 90) {operateZoomTest(e)}
            }
        }
        const handleScroll = () => {
            let viewportHeight = typeof window !== 'undefined' ? window.innerHeight : undefined
            if (!viewportHeight) return
            let scrollUp = scrollWrapper.scrollTop < aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.1
            let scrollDown = scrollWrapper.scrollTop > aboveTimelineHeight + (scrollWrapper.scrollHeight - aboveTimelineHeight) * 0.9 - viewportHeight
            if (scrollUp || scrollDown) {operateScrollTest(scrollUp)}
        }
        timeline.addEventListener('wheel' , handleWheel);
        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            timeline.removeEventListener('wheel', handleWheel);
            scrollWrapper.removeEventListener('scroll', handleScroll)
        };
    });
    return (
        <div ref={timelineRef} className='flex flex-col max-w-lg relative overflow-hidden' style={{height: `${totalHeight + 20}px`}}>
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
    const eventBoxHeight = 124
    const overlapBottom = 6
    const arrayOfHeight = currentEvents.map((cEvent: TimelineEvent) => eventBoxHeight + cEvent.overlap * overlapBottom)
    const totalHeight = sum(arrayOfHeight)

    return <div className={`w-3 h-[10px] relative animate-fadeIn`}><div className={`absolute w-0.5 bg-gray-600 left-1/2`} style={{height: `${totalHeight + 20}px`, transform:'translate(-50%,-0)'}}></div></div>
}
const EventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    const lastAction = useSelector((state: RootState) => state.reducer.events.lastAction)

    let animation = event.fadeout ? 'animate-fadeOut' : event.distance !== undefined ? '' :'animate-fadeIn'
    let zIndex = event.fadeout || animation === 'animate-fadeIn' ? '' : 'z-20'
    let paddingBottom = event.overlap === 0 ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'

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
        <div ref={eventBoxRef} className={`relative flex pt-[6px] flex-shrink-0 ${paddingBottom} ${animation} ${zIndex}`}>
            <EventNode />
            <EventContent event={event}/>
            <OverlapContent1 event={event}/>
            <OverlapContent2 event={event}/>
        </div>
    )
}
const EventNode = () => {
    return <div className='w-3 mr-2.5 z-10'><div className='w-3 h-3 bg-white mr-2.5 border-2 rounded-full border-gray-600'></div></div>
}



const EventContent = ({event} : {event: TimelineEvent}) => {
    return (
        <div className={"cursor-pointer w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5"}>
            <div className={'flex gap-2.5'}>
                <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
                <div className={'text-[12px] text-gray-500 line-clamp-1 overflow-hidden'}>#전쟁</div>
            </div>
            <div className={'mt-0.5 font-black'}>{event.title}</div>
            <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'}>{event.content}</div>
        </div>
    )
}
const OverlapContent1 = ({event} : {event: TimelineEvent}) => {
    const display = event.overlap !== 0 ? '' : 'hidden'
    return (
        <div className={`${display} absolute top-[24px] left-[28px] h-[100px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-10`} style={{width: `calc(100% - 34px)`}}></div>
    )
}
const OverlapContent2 = ({event} : {event: TimelineEvent}) => {
    const display = event.overlap === 2 ? '' : 'hidden'
    return (
        <div className={`${display} flex-shrink-0 absolute top-[42px] left-[34px] h-[88px] bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md -z-20`} style={{width: `calc(100% - 46px)`}}></div>
    )
}

const AfterEffect = () => {
    const prevEventsWithEffect = useSelector((state: RootState) => state.reducer.events.prevEventsWithEffect)
    const afterEffectTop = useSelector((state: RootState) => state.reducer.events.afterEffectTop)
    return (
        <div className={'absolute left-0'} style={{top: `${afterEffectTop + 10}px`}}>
            {prevEventsWithEffect.map((event: TimelineEvent) => {
                if (event.fadeout || event.distance) {
                    return <AfterEventBox key={event.id} event={event} />
                } return <BlankBox key={event.id} event={event} />
            })}
        </div>
    )
}

const AfterEventBox = ({event} : {event: TimelineEvent}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    let zIndex = event.fadeout ? '' : 'z-20'
    let paddingBottom = event.overlap === 0 ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'
    useEffect(() => {
        const eventBox = eventBoxRef.current
        if (!eventBox) return
        const tl = gsap.timeline()
        tl.fromTo(eventBox, {y: event.distance ? event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
        tl.play()
        return ()=> {tl.kill()}
    })
    return (
        <div ref={eventBoxRef} className={`relative flex pt-[6px] ${paddingBottom} animate-fadeOut ${zIndex}`}>
            <EventNode />
            <EventContent event={event}/>
            <OverlapContent1 event={event}/>
            <OverlapContent2 event={event}/>
        </div>
    )
}
const BlankBox = ({event}:{event:TimelineEvent}) => {
    let paddingBottom = event.overlap === 0 ? 'pb-[6px]' : event.overlap === 1 ? 'pb-[12px]' : 'pb-[18px]'
    return <div className={`pt-[6px] ${paddingBottom}`} style={{transform:'translate(0,-0)'}}><div className={'h-28'}></div></div>
}