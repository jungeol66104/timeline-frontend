import React from 'react';
import useTimelineNameBar from "@/hooks/useTimelineNameBar";
import {useSelector} from "react-redux";
import {selectShowTimelineNameBar, selectTimelineContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const TimelineTitleBar = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const timelineType = useSelector(selectTimelineContentType)
    const showTimelineNameBar = useSelector(selectShowTimelineNameBar)

    const timelineName = timelineType === 'new' ? currentTimelineDraft.name : currentTimeline.name

    useTimelineNameBar()

    return (
        <div className={`informationHeader ${(!showTimelineNameBar || timelineName === '') && 'hidden'} flex fixed top-[60px] pt-[5px] pb-[3px] w-full h-[30px] flex-col bg-white border-b-[1px]`} style={{zIndex: 4999}}>
            <span className={'informationHeaderName pl-3 w-full max-w-[630px] min-[852px]:max-w-[1002px] text-sm font-semibold'}>{timelineName}</span>
        </div>
    );
};

export default TimelineTitleBar;
