import React from 'react';
import AddEventButton from "@/components/timelines/timelineEdit/addEventButton";
import CompleteButton from "@/components/timelines/timelineEdit/completeButton";

const TimelineEditMenubar = () => {

    return (
        <div className={'sticky top-[90px] py-3 px-4 flex items-center justify-between bg-white z-50'}>
            <AddEventButton />
            <CompleteButton />
        </div>
    );
};

export default TimelineEditMenubar;
