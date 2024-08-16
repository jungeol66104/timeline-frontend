import React from 'react';
import EventsMenubar from "@/components/timelines/eventsMenubar";
import EventsPreview from "@/components/timelines/eventsPreview";
import EventsBottom from "@/components/timelines/eventsBottom";
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";

const Events = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd)

    return (
        <div className={'p-3 pb-0 max-[630px]:p-0 flex flex-col gap-3 border-[1px] border-gray-300 max-[630px]:border-none rounded-2xl max-[630px]:rounded-none'}>
            <EventsMenubar />
            <EventsPreview />
            {isBottomEnd && <EventsBottom/>}
        </div>
    );
};

export default Events;
