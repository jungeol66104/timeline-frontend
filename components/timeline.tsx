import React, {RefObject, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {
    decrementDepth,
    incrementDepth,
    updateEvents,
    updateEventsWithDistance,
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
    const currentEventsWithDistance = useSelector((state: RootState) => state.reducer.events.currentEventsWithDistance)
    const scrollTop = useSelector((state: RootState) => state.reducer.events.scrollTop)
    const lastAction = useSelector((state: RootState) => state.reducer.events.lastAction)
    // vars
    const numOfEvents: number = currentEvents.length
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
        const getSwipedEvent = (scrollWrapper: HTMLDivElement, e: WheelEvent, eType: string ) : EventWithOrderTop => {
            if (eType === 'wheel') {
                let clientYInContainer = scrollWrapper.scrollTop + e.clientY
                let order = Math.floor((clientYInContainer - aboveTimelineHeight) / eventBoxHeight)
                let top = aboveTimelineHeight + order * eventBoxHeight - scrollWrapper.scrollTop
                return {...currentEvents[order], order: order, top: top}
            } else return {...currentEvents[currentEvents.length - 1], order: 0, top: 0}
        }
        const fetchEvents = (depth: number, events: TimelineEvent[]) => {
            if (depth === 3 || depth === -1) return currentEvents
            return events.filter(event => event.depth <= depth)
        }
        const getReferEvent = (swipedEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            let differences = fetchedEvents.map(fEvent => Math.abs(currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order))
            let order = differences.findLastIndex(diff => diff === Math.min(...differences))
            return {...fetchedEvents[order], order: order, top: null}
        }
        const getEventsWithDistance = (swipedEvent: EventWithOrderTop, referEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
            return fetchedEvents.map((fEvent, i) => {
                if (currentEvents?.includes(fEvent)) {
                    let currentOrder = currentEvents.findIndex(cEvent => cEvent.id === fEvent.id) - swipedEvent.order
                    let newOrder = i - fetchedEvents.findIndex(fEvent2 => fEvent2.id === referEvent.id)
                    console.log('distance: ' , newOrder, currentOrder)
                    return {...fEvent, distance: (newOrder - currentOrder) * eventBoxHeight}
                }
                return fEvent
            })
        }

        // const getEventsWithDistance = (swipedEvent: EventWithOrderTop, fetchedEvents: TimelineEvent[]) => {
        //    return fetchedEvents.map(event => {
        //        if (currentEvents?.includes(event)) {
        //            const currentOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id) - currentEvents.findIndex(cEvent => cEvent.id === swipedEvent.id)
        //            const newOrder = fetchedEvents.findIndex(fEvent => fEvent.id === event.id) - fetchedEvents.findIndex(fEvent => fEvent.id === swipedEvent.id)
        //            let distance = (newOrder - currentOrder) * 122
        //            console.log('distance: ', newOrder, currentOrder)
        //            return {...event, distance: distance}
        //        {}
        //        console.log('fEvent not included in currentEvents')
        //        return event
        //    })
        // }
        const getScrollTop = (referEvent: EventWithOrderTop, newEvents: TimelineEvent[]) => {
            if (!referEvent.top) return 0
            let eventOrder = newEvents.findIndex(event => event.id === referEvent.id)
            let TopInContainer = aboveTimelineHeight + eventOrder * eventBoxHeight
            return TopInContainer - referEvent.top
        }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                e.stopPropagation()

                if (!isScrolling && e.deltaX < -90) {
                    let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e, 'wheel')
                    let referEvent = swipedEvent
                    let fetchedEvents = fetchEvents(currentDepth + 1, events)
                    if (fetchedEvents === currentEvents) return // last zoom
                    let eventsWithDistance = getEventsWithDistance(swipedEvent, referEvent, fetchedEvents)
                    let newScrollTop = getScrollTop(swipedEvent, eventsWithDistance)

                    dispatch(incrementDepth())
                    dispatch(updateEvents(fetchedEvents))
                    dispatch(updateEventsWithDistance(eventsWithDistance))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateLastAction('zoomIn'))
                } else if (!isScrolling && e.deltaX > 90) {
                    // refactor the whole operation into one function after incarnating scroll feature
                    let swipedEvent: EventWithOrderTop = getSwipedEvent(scrollWrapper, e, 'wheel')
                    let referEvent = swipedEvent
                    let fetchedEvents = fetchEvents(currentDepth - 1, events)
                    if (fetchedEvents === currentEvents) return // last zoom
                    if (!fetchedEvents.some(fEvent => fEvent.id === swipedEvent.id)) {
                        referEvent = getReferEvent(swipedEvent, fetchedEvents)
                    }
                    let eventsWithDistance = getEventsWithDistance(swipedEvent, referEvent, fetchedEvents)
                    let newScrollTop = getScrollTop(swipedEvent, eventsWithDistance)

                    dispatch(decrementDepth())
                    dispatch(updateEvents(fetchedEvents))
                    dispatch(updateEventsWithDistance(eventsWithDistance))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateLastAction('zoomOut'))
                }
            }
        }
        if(timeline) {
            timeline.addEventListener('wheel' , handleWheel);
        }
        return () => {
            if(timeline) {
                timeline.removeEventListener('wheel', handleWheel);
            }
        };
    });

    return (
        <div ref={timelineRef} className='ml-5 mr-5 mb-2.5 h-max max-w-lg'>
            <BodyLine numOfEvents={numOfEvents} />
            {currentEventsWithDistance.map((event: TimelineEvent) => {
                return <EventBox key={event.id} event={event} />
            })}
        </div>
    )
}

export default Timeline

const BodyLine = ({numOfEvents}: {numOfEvents:number}) => {
    return (
        <div className={`w-3 h-2.5 relative animate-fadeIn`}>
            <div className={`absolute w-0.5 bg-gray-400 left-1/2`} style={{height: `${numOfEvents * 122 + 20}px`, transform:'translate(-50%,-0)'}}></div>
            <div className={`absolute w-0.5 bg-gray-600 left-1/2 top-[15px]`} style={{height: `${numOfEvents * 122 - 10}px`, transform:'translate(-50%,-0)'}}></div>
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
        tl.fromTo(eventBox, {y: event.distance ? -event.distance : '0'}, {y: '0', duration: 1, ease: 'ease-in-out'})
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