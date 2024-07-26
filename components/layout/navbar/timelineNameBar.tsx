import React from 'react';
import useTimelineNameBar from "@/hooks/useTimelineNameBar";
import {useSelector} from "react-redux";
import {selectShowTimelineNameBar} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const TimelineNameBar = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const showTimelineNameBar = useSelector(selectShowTimelineNameBar)

    useTimelineNameBar()

    return (
        <div className={`informationHeader ${!showTimelineNameBar && 'hidden'} flex fixed top-[60px] pt-[5px] pb-[3px] w-full h-[30px] flex-col bg-white border-b-[1px]`} style={{zIndex: 4999}}>
            <span className={'informationHeaderName pl-4 w-full max-w-[630px] min-[852px]:max-w-[1002px] text-sm font-semibold'}>{currentTimeline.name}</span>
        </div>
    );
};

export default TimelineNameBar;
