import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const TimelineInformationHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'timelineInformationHeader fixed top-[60px] left-1/2 transform -translate-x-1/2 pl-5 pt-1 pb-[2px] w-full max-w-lg bg-white text-md font-semibold border-b-[1px]'} style={{zIndex: 4999}}>Asian Financial Crisis</div>
    );
};

export default TimelineInformationHeader;
