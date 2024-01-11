import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";

const TimelineHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'absolute flex items-center gap-2.5 w-full'}>
            <div className={'w-[28px] h-[28px] top-0 right-0'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} /></div>
            <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
        </div>
    );
};

export default TimelineHeader;
