import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, selectCurrentEventsDraft, TimelineEvent} from "@/store/slices/contentsSlice";
import EventPreview from "@/components/timelines/events/eventPreview";

const EventsPreview = () => {
    const timelineType = useSelector(selectTimelineType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)

    const events = timelineType === 'new' ? currentEventsDraft : currentEvents

    return (
        <div className={'relative'}>
            <div className={`z-10 absolute left-[6px] w-0.5 h-full bg-gray-600`} style={{transform: 'translate(-50%,-0)'}}></div>
            <div className={'flex flex-col gap-3'}>
                {events.map((event: TimelineEvent) => {
                    return <EventPreview key={event.id} event={event}/>
                })}
            </div>
        </div>
    );
};

export default EventsPreview;
