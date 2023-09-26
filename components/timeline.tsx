import React, {RefObject, useEffect, useRef, useState} from "react";
import events, {Event} from '../public/events'
import gsap from 'gsap'

const Timeline = ({ scrollRef }: {scrollRef: React.RefObject<HTMLDivElement>}) => {

    // refs
    const timelineRef: RefObject<HTMLDivElement> = useRef(null)

    // states
    const [currentDepth, setCurrentDepth] = useState(0)
    const [currentEvents, setCurrentEvents] = useState(events.filter((event) => event.depth === 0))
    const [prevEvents, setPrevEvents] = useState<Event[] | null >(null)
    const [swipedEventId, setSwipedEventId] = useState(0)
    const [scrollTop, setScrollTop] = useState(0)

    // redux


    // prevents additional zoom
    const [waiting, setWaiting] = useState(0)
    let isScrolling = true
    setTimeout(() => {isScrolling = false}, 500)

    // vars
    const numOfEvents: number = currentEvents.length
    const eventsWithDistance = currentEvents.map(event => {
        if (prevEvents?.includes(event)) {
            const prevOrder = prevEvents?.findIndex(pEvent => pEvent.id === event.id) - prevEvents?.findIndex(pEvent => pEvent.id === swipedEventId)
            const currentOrder = currentEvents?.findIndex(cEvent => cEvent.id === event.id) - currentEvents?.findIndex(cEvent => cEvent.id === swipedEventId)
            const distance = (currentOrder - prevOrder) * 122
            return {...event, distance: distance}
        }
        return event
    })
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
        // fetch event


        // getReferEvent (scrollWrapper, JSevent, event type) =>  event with id, order, top
        const getReferEvent = (scrollContainer: HTMLDivElement, e: WheelEvent, eType: string ) => {
            if (eType === 'wheel') {
                let clientYInContainer = scrollContainer.scrollTop + e.clientY
                let eventOrder = Math.floor((clientYInContainer - aboveTimelineHeight) / eventBoxHeight)
                let event: Event = currentEvents[eventOrder]
                let top = aboveTimelineHeight + eventOrder * eventBoxHeight - scrollContainer.scrollTop
                event.order = eventOrder
                event.top = top
                return event
            }
        }

        const filterEvents = (depth: number, events: Event[]) => {
            if (currentDepth === 2) return // last zoom check
            return events.filter(event => event.depth <= depth)
        }

        // getEvents (depth, referEvent) => new events with distance or not, prev event
        const getEvents = (depth: number, referEvent: Event, ) => {
            if (currentDepth === 2) return
            let newEvents = events.filter(event => event.depth <= depth)

        }

        // getScrollTop (newEvent, referEvent) => scrollTop
        const getScrollTop = () => {

        }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                e.stopPropagation()

                // RTK used codes sit here


                // left-right swipe, zoom in
                if (!isScrolling && e.deltaX < -90) {
                    // get event id
                    let ClientYInTimeline = scrollWrapper.scrollTop + e.clientY
                    if (ClientYInTimeline <= 70) return // if swipe happened in non-timeline area
                    let eventOrder = Math.floor((ClientYInTimeline - 70) / 122)
                    let eventId = currentEvents[eventOrder].id

                    // get scrollTop
                    let eventTop = 70 + eventOrder * 122 - scrollWrapper.scrollTop

                    let newEvents = filterEvents(currentDepth + 1, events)
                    if (!newEvents) return //no more zoom is possible
                    let newEventOrder = newEvents.findIndex(event => event.id === eventId)
                    let newClientYInTimeline = 70 + 122 * newEventOrder
                    let newScrollTop = newClientYInTimeline - eventTop

                    setCurrentDepth(prev => prev + 1)
                    setCurrentEvents(newEvents)
                    setPrevEvents(currentEvents)
                    setSwipedEventId(eventId)
                    setScrollTop(newScrollTop)
                    setWaiting(500)
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
            {eventsWithDistance.map((event: Event) => {
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

const EventBox = ({event} : {event: Event}) => {
    const eventBoxRef: RefObject<HTMLDivElement> = useRef(null)
    let animation =  event.distance ? '' : 'animate-fadeIn'

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

const EventContent = ({event} : {event: Event}) => {
    return (
        <div className="w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5">
            <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
            <div className={'mt-0.5 font-black'}>{event.title}</div>
            <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'}>{event.content}</div>
        </div>
    )
}