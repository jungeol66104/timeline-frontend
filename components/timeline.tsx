import React, {RefObject, useEffect, useRef, useState} from "react";
import events, {Event} from '../public/events'

const Timeline = () => {
    const timelineRef: RefObject<HTMLDivElement> = useRef(null)
    const [currentDepth, setCurrentDepth] = useState(0)
    const [currentEvents, setCurrentEvents] = useState(events.filter((event) => event.depth = 0))
    const numOfEvents: number = currentEvents.length
    console.log(currentEvents)
    console.log(events)
    const filterEvents = (depth: number, events: Event[]) => {
        return events.filter((event) => {
            return event.depth <= depth
        })
    }

    // swipe event handling (touch, touchpad&wheel)
    useEffect(() => {
        let touchStartX: number | null = null;// To store the swiped child element
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (touchStartX === null) return; // No touchstart recorded

            const touchEndX = e.changedTouches[0].clientX;
            const deltaX = touchEndX - touchStartX;

            if (deltaX > 50) {
                // A right-to-left swipe (adjust the threshold as needed)
                e.preventDefault(); // Prevent the default browser back navigation behavior
                }
            touchStartX = null; // Reset touch start
            }

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaX !== 0) {
                e.preventDefault()
                e.stopPropagation()
                if (e.deltaX < -75) {
                    console.log('swipe')
                }
            }
        }
        const timeline = timelineRef.current

        if(timeline) {
            timeline.addEventListener('touchstart', handleTouchStart);
            timeline.addEventListener('touchend', handleTouchEnd);
            timeline.addEventListener('wheel' , handleWheel);
        }

        return () => {
            if(timeline) {
                timeline.removeEventListener('touchstart', handleTouchStart);
                timeline.removeEventListener('touchend', handleTouchEnd);
                timeline.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div ref={timelineRef} className='ml-5 mr-5'>
            <BodyLine numOfEvents={numOfEvents} />
            {currentEvents.map((event) => {
                return <EventBox key={event.id} event={event}/>
            })}
        </div>
    )
}

export default Timeline

const BodyLine = ({numOfEvents}: {numOfEvents:number}) => {
    return (
        <div className={`w-3 h-5 relative`}>
            <div className={`absolute w-0.5 bg-gray-400 left-1/2 `} style={{height: `${numOfEvents * 122 + 30}px`, transform:'translate(-50%,-0)'}}></div>
            <div className={`absolute w-0.5 bg-gray-600 left-1/2 top-5`} style={{height: `${numOfEvents * 122 - 10}px`, transform:'translate(-50%,-0)'}}></div>
        </div>
    )
}

const EventBox = ( {event} : {event: Event} ) => {
    return (
        <div className='flex pb-2.5'>
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