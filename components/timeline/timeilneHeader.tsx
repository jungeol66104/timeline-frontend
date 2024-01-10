import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";

const TimelineHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'absolute left-[-6px] flex items-center gap-2.5'}>
            <div className={'w-[24px] h-[24px] mb-[1px]'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={32} height={32} /></div>
            <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
        </div>
    );
};

export default TimelineHeader;
