import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import AddEventButton from "@/components/timelines/events/addEventButton";
import SaveTimelineButton from "@/components/timelines/timelineEdit/saveTimelineButton";
import ResetEditButton from "@/components/common/edit/resetEditButton";

const TimelineEditMenubar = () => {
    const timelineType = useSelector(selectTimelineType)
    const top = timelineType === 'demo' ? 0 : 90

    return (
        <div className={`z-40 sticky top-[${top}px] py-3 px-4 flex items-center justify-between bg-white`}>
            <AddEventButton />
            <div className={'flex gap-3'}>
                <ResetEditButton />
                <SaveTimelineButton />
            </div>
        </div>
    );
};

export default TimelineEditMenubar;
