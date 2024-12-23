import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const EventsBottom = () => {
    const timelineType = useSelector(selectTimelineType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)

    const timeline = timelineType === 'new' ? currentTimelineDraft : currentTimeline

    return (
        <div>
            <div className={'pb-3 max-[630px]:pb-0 text-sm text-center italic'}>End of the Timeline<br/><b>{timeline.title}</b></div>
        </div>
    );
};

export default EventsBottom;
