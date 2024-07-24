import React from 'react';
import AddEventButton from "@/components/timelines/timelineEdit/addEventButton";
import SaveTimelineButton from "@/components/timelines/timelineEdit/saveTimelineButton";

const TimelineEditMenubar = () => {
    return (
        <div className={'sticky top-[90px] py-3 px-4 flex items-center justify-between bg-white z-40'}>
            <AddEventButton />
            <SaveTimelineButton />
        </div>
    );
};

export default TimelineEditMenubar;
