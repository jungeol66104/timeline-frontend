import React from 'react';
import AddEventButton from "@/components/timelines/timelineEdit/addEventButton";
import CreateTimelineButton from "@/components/timelines/timelineNew/createTimelineButton";


const TimelineNewMenubar = () => {
    return (
        <div className={'sticky top-[90px] py-3 px-4 flex items-center justify-between bg-white z-40'}>
            <AddEventButton/>
            <CreateTimelineButton />
        </div>
    );
};

export default TimelineNewMenubar;
