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
    const [swipedEventId, setSwipedEventId] = useState<number | null>(null)
    const [scrollTop, setScrollTop] = useState(0)

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

    // scrollTop setup after zoom
    useEffect(() => {
        const scrollWrapper = scrollRef.current
        if (scrollWrapper) {
            scrollWrapper.scrollTop = scrollTop
        }
    },[scrollTop])

    // swipe event handling (touch, touchpad&wheel)
    useEffect(() => {
        // define ref nodes after rendering
        const scrollWrapper = scrollRef.current
        const timeline = timelineRef.current
        let isScrolling = false

    //     let touchStartX: number | null = null;// To store the swiped child element
    //     const handleTouchStart = (e: TouchEvent) => {
    //         touchStartX = e.touches[0].clientX;
    //     };
    //
    //     const handleTouchEnd = (e: TouchEvent) => {
    //         if (touchStartX === null) return; // No touchstart recorded
    //
    //         const touchEndX = e.changedTouches[0].clientX;
    //         const deltaX = touchEndX - touchStartX;
    //
    //         if (deltaX > 50) {
    //             // A right-to-left swipe (adjust the threshold as needed)
    //             e.preventDefault(); // Prevent the default browser back navigation behavior
    //             }
    //         touchStartX = null; // Reset touch start
    //         }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                e.stopPropagation()
                if (!isScrolling && e.deltaX < -75) {
                    //no more additional scrolling
                    isScrolling = true

                    // get event id
                    if (!scrollWrapper) return
                    let ClientYInTimeline = scrollWrapper.scrollTop + e.clientY
                    let eventOrder = Math.floor((ClientYInTimeline - 70) / 122)
                    let eventId = currentEvents[eventOrder].id

                    // get new scrollTop
                    let eventTop = 70 + eventOrder * 122 - scrollWrapper.scrollTop //not right

                    // (temporary function) for filtering events that match currentDepth
                    const filterEvents = (depth: number, events: Event[]) => {
                        if (currentDepth === 1) return // last zoom check
                        return events.filter(event => event.depth <= depth)
                    }
                    let newEvents = filterEvents(currentDepth + 1, events)
                    if (!newEvents) return //no more zoom im possible
                    let newEventOrder = newEvents.findIndex(event => event.id === eventId)
                    let newClientYInTimeline = 70 + 122 * newEventOrder
                    let newScrollTop = newClientYInTimeline - eventTop

                    setScrollTop(newScrollTop)
                    setCurrentDepth(prev => prev + 1)
                    setCurrentEvents(newEvents)
                    setPrevEvents(currentEvents)
                    setSwipedEventId(eventId)
                }
            }
        }

        if(timeline) {
            // timeline.addEventListener('touchstart', handleTouchStart);
            // timeline.addEventListener('touchend', handleTouchEnd);
            timeline.addEventListener('wheel' , handleWheel);
        }

        return () => {
            if(timeline) {
                // timeline.removeEventListener('touchstart', handleTouchStart);
                // timeline.removeEventListener('touchend', handleTouchEnd);
                timeline.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div ref={timelineRef} className='ml-5 mr-5 max-w-lg'>
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

const EventBox = ( {event} : {event: Event} ) => {
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

const EventContent = ( {event} : {event: Event}) => {
    return (
        <div className="w-full h-28 bg-white border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5">
            <div className={'text-[12px] font-semibold text-gray-500 line-clamp-1 overflow-hidden'}>{event.date}</div>
            <h6 className={'mt-0.5 font-black'}>{event.title}</h6>
            <div className={'mt-1.5 overflow-hidden line-clamp-2 text-[14px] font-medium'}>{event.content}</div>
        </div>
    )
}