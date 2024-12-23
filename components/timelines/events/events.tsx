import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";
import EmptyEvents from "@/components/timelines/events/emptyEvents";
import EventsMenubar from "@/components/timelines/events/eventsMenubar";
import EventsPreview from "@/components/timelines/events/eventsPreview";
import EventsBottom from "@/components/timelines/events/eventsBottom";

const Events = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd)
    const currentEvents = useSelector(selectCurrentEvents)

    const isEmptyEvents = currentEvents.length === 0

    return (
        <div className={'p-3 pb-0 max-[630px]:p-0 flex flex-col gap-3 border-[0.1px] border-gray-300 max-[630px]:border-none rounded-2xl max-[630px]:rounded-none'}>
            {isEmptyEvents && <EmptyEvents />}
            {!isEmptyEvents && <EventsMenubar />}
            {!isEmptyEvents && <EventsPreview />}
            {!isEmptyEvents && isBottomEnd && <EventsBottom/>}
        </div>
    );
};

export default Events;
