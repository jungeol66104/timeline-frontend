import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const TimelineInformationHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'timelineInformationHeader fixed top-[60px] pl-5 pt-[5px] pb-[3px] w-full bg-white text-sm font-semibold border-b-[1px]'} style={{zIndex: 4999}}>{currentTimeline.name}</div>
    );
};

export default TimelineInformationHeader;
