import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const TimelineInformationHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'timelineInformationHeader fixed top-[60px] pt-[5px] pb-[3px] w-full flex flex-col bg-white text-sm font-semibold border-b-[1px]'} style={{zIndex: 4999}}>
            <div className={'w-full pl-5 max-w-[670px]'}>{currentTimeline.name}</div>
        </div>
    );
};

export default TimelineInformationHeader;
