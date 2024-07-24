import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";

const TimelineBottom = ({isEnd}:{isEnd: boolean}) => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const timelineContentType = useSelector(selectTimelineContentType)
    const timeline = timelineContentType === 'new' || timelineContentType === 'edit' ? currentTimelineDraft : currentTimeline

    return (
        <div className={'timelineEventsBottom h-[60px] w-full mt-2.5 flex justify-center items-center'} style={{zIndex: 4000}}>
            {isEnd
                ?   <div className={'ml-[22px] text-sm text-center italic pb-[16px]'}>End of the Timeline<br/><b>{timeline.name}</b></div>
                :   <></>
            }
        </div>
    );
};

export default TimelineBottom;
