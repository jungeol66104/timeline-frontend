import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvents, Event} from "@/store/slices/contentsSlice";
import EventPreview from "@/components/timelines/events/eventPreview";
import {selectIsKeynote} from "@/store/slices/appearanceSlice";

const EventsPreview = () => {
    const currentEvents = useSelector(selectCurrentEvents)
    const isKeynote = useSelector(selectIsKeynote)

    let events = isKeynote ? [...currentEvents.filter((event) => event.isKeynote === 1)] : [...currentEvents]
    events.sort((a, b) => Number(a.ephemerisTime) - Number(b.ephemerisTime))
    const isEmptyKeynote = events.length === 0

    return (
        <div className={'relative'}>
            {!isEmptyKeynote && <div className={`z-10 absolute left-[6px] w-0.5 h-full bg-gray-600`} style={{transform: 'translate(-50%,-0)'}}></div>}
            <div className={'flex flex-col gap-3'}>
                {events.map((event: Event) => {
                    return <EventPreview key={event.id} event={event}/>
                })}
            </div>
            {isEmptyKeynote &&
                <div className='timeline relative py-10 px-4 w-full flex flex-col items-center justify-center gap-5'>
                    <div className={'text-center'}>
                        <h2 className={'text-xl font-semibold'}>No keynote events are found.</h2>
                        <div>Uncheck keynote to see the full timeline.</div>
                    </div>
                </div>
            }
        </div>
    );
};

export default EventsPreview;
