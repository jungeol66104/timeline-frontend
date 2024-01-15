import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import ShareSVG from "@/public/svg/share.svg"

const TimelineHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'absolute flex items-center gap-2.5 w-full'}>
            <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
            <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px]'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} /></div>
            <button className={'pb-[1px]'}><Image src={ShareSVG} alt={'share'} width={22} height={22}/></button>
        </div>
    );
};

export default TimelineHeader;
