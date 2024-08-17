import React from 'react';
import {useSelector} from "react-redux";
import EventsMenubar from "@/components/timelines/events/eventsMenubar";
import EventsPreview from "@/components/timelines/events/eventsPreview";
import EventsBottom from "@/components/timelines/events/eventsBottom";
import EmptyEvents from "@/components/timelines/events/emptyEvents";
import {selectIsBottomEnd, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, selectCurrentEventsDraft} from "@/store/slices/contentsSlice";

const Events = () => {
    const timelineType = useSelector(selectTimelineType)
    const isBottomEnd = useSelector(selectIsBottomEnd)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)

    const events = timelineType === 'new' ? currentEventsDraft : currentEvents
    const isEmptyEvents = events.length === 0

    return (
        <div className={'p-3 pb-0 max-[630px]:p-0 flex flex-col gap-3 border-[1px] border-gray-300 max-[630px]:border-none rounded-2xl max-[630px]:rounded-none'}>
            {isEmptyEvents && <EmptyEvents />}
            {!isEmptyEvents && <EventsMenubar />}
            {!isEmptyEvents && <EventsPreview />}
            {isBottomEnd && <EventsBottom/>}
        </div>
    );
};

export default Events;
