import React, {RefObject, useEffect, useRef, useState} from "react";
import events, {TimelineEvent} from '@/public/events'
import gsap from 'gsap'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {
    decrementDepth,
    incrementDepth,
    updateEvents,
    updateEventsWithDistance, updateLastAction,
    updateScrollTop
} from "@/store/slices/eventsSlice";
import rootReducer from "@/store/rootReducer";

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
    // prevents additional zoom
    let isScrolling = true
    if (lastAction === 'zoomIn' || lastAction === 'zoomOut') {
        setTimeout(() => {isScrolling = false}, 500)
    } else { isScrolling = false }
    // vars
    const numOfEvents: number = currentEvents.length
    const aboveTimelineHeight = 70
    const eventBoxHeight = 122

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
        // vars
        // functions
        const getReferEvent = (scrollContainer: HTMLDivElement, e: WheelEvent, eType: string ) => {
            if (eType === 'wheel') {
                let clientYInContainer = scrollContainer.scrollTop + e.clientY
                let eventOrder = Math.floor((clientYInContainer - aboveTimelineHeight) / eventBoxHeight)
                let referEvent: TimelineEvent = {...currentEvents[eventOrder]}
                let top = aboveTimelineHeight + eventOrder * eventBoxHeight - scrollContainer.scrollTop
                referEvent = {...referEvent, order: eventOrder, top: top}
                return referEvent
            } else return currentEvents[currentEvents.length - 1]
        }
        const fetchEvents = (depth: number, events: TimelineEvent[]) => {
            if (depth === 3 || depth === -1) return currentEvents // last zoom check
            return events.filter(event => event.depth <= depth)
        }

        const getEventsWithDistance = (referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {
            // if (!fetchedEvents.some(event => event.id === referEvent.id)) {
            //     referEvent = fetchedEvents.find(event => event.id > referEvent.id) || fetchedEvents.findLast(event => event.id < referEvent.id) as TimelineEvent // no possibility for null
            // }

           return fetchedEvents.map(event => {
               if (currentEvents?.includes(event)) {
                   const currentOrder = currentEvents.findIndex(cEvent => cEvent.id === event.id) - currentEvents.findIndex(cEvent => cEvent.id === referEvent.id)
                   const newOrder = fetchedEvents.findIndex(fEvent => fEvent.id === event.id) - fetchedEvents.findIndex(fEvent => fEvent.id === referEvent.id)
                   // change the order of subtraction if the usage of sign is awkward
                   let distance = (newOrder - currentOrder) * 122
                   return {...event, distance: distance}
               }
               return event
           })
        }

        const getNearReferEvent = (referEvent: TimelineEvent, fetchedEvents: TimelineEvent[]) => {

        }

        const getScrollTop = ( referEvent: TimelineEvent, newEvents: TimelineEvent[]) => {
            if (!referEvent.top) return 0
            let eventOrder = newEvents.findIndex(event => event.id === referEvent.id)
            let clientYInContainer = aboveTimelineHeight + eventOrder * eventBoxHeight
            return clientYInContainer - referEvent.top
        }
        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                e.stopPropagation()

                if (!isScrolling && e.deltaX < -90) {
                    let referEvent = getReferEvent(scrollWrapper, e, 'wheel')
                    let fetchedEvents = fetchEvents(currentDepth + 1, events)
                    if (fetchedEvents === currentEvents) return // last zoom
                    let eventsWithDistance = getEventsWithDistance(referEvent, fetchedEvents)
                    let newScrollTop = getScrollTop(referEvent, eventsWithDistance)

                    dispatch(incrementDepth())
                    dispatch(updateEvents(fetchedEvents))
                    dispatch(updateEventsWithDistance(eventsWithDistance))
                    dispatch(updateScrollTop(newScrollTop))
                    dispatch(updateLastAction('zoomIn'))
                } else if (!isScrolling && e.deltaX > 90) {
                    // refactor the whole operation into one function after incarnating scroll feature
                    let referEvent = getReferEvent(scrollWrapper, e, 'wheel')
                    let fetchedEvents = fetchEvents(currentDepth - 1, events)
                    if (fetchedEvents === currentEvents) return // last zoom
                    if (!fetchedEvents.some(event => event.id === referEvent.id)) {
                        referEvent = getNearReferEvent()
                    }
                    let eventsWithDistance = getEventsWithDistance(referEvent, fetchedEvents)
                    let newScrollTop = getScrollTop(referEvent, eventsWithDistance)

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
        tl.fromTo(eventBox,
            {
                y: event.distance ? -event.distance : '0',
            },
            {
                y: '0',
                duration: 1,
                ease: 'ease-in-out',
            }
        )
        tl.play()
        return ()=> {
            tl.kill()
        }
    }, );

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