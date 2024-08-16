import React from 'react';
import {useSelector} from "react-redux";
import EventsMenubar from "@/components/timelines/events/eventsMenubar";
import EventsPreview from "@/components/timelines/events/eventsPreview";
import EventsBottom from "@/components/timelines/events/eventsBottom";
import {selectIsBottomEnd, selectTimelineType} from "@/store/slices/appearanceSlice";
import EmptyEvents from "@/components/timelines/events/emptyEvents";

const Events = () => {
    const timelineType = useSelector(selectTimelineType)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'p-3 pb-0 max-[630px]:p-0 flex flex-col gap-3 border-[1px] border-gray-300 max-[630px]:border-none rounded-2xl max-[630px]:rounded-none'}>
            {(timelineType === 'public' || timelineType === 'private') && <EventsMenubar />}
            {(timelineType === 'public' || timelineType === 'private') && <EventsPreview />}
            {(isBottomEnd && timelineType !== 'new') && <EventsBottom/>}
            {timelineType === 'new' && <EmptyEvents />}
        </div>
    );
};

export default Events;
