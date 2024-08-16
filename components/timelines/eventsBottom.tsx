import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const EventsBottom = () => {
    const timelineType = useSelector(selectTimelineType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const timeline = timelineType === 'new' ? currentTimelineDraft : currentTimeline

    return (
        <div>
            <div className={'pb-3 text-sm text-center italic'}>End of the Timeline<br/><b>{timeline.name}</b></div>
        </div>
    );
};

export default EventsBottom;
