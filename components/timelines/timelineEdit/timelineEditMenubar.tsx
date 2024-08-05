import React from 'react';
import AddEventButton from "@/components/timelines/timelineEdit/addEventButton";
import SaveTimelineButton from "@/components/timelines/timelineEdit/saveTimelineButton";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const TimelineEditMenubar = () => {
    const timelineType = useSelector(selectTimelineType)
    const top = timelineType === 'demo' ? 0 : 90

    return (
        <div className={`sticky top-[${top}px] py-3 px-4 flex items-center justify-between bg-white z-40`}>
            <AddEventButton />
            <SaveTimelineButton />
        </div>
    );
};

export default TimelineEditMenubar;
