import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import ShareSVG from "@/public/svg/share.svg"

const TimelineHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <>
            <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
            <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px]'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} /></div>
            {/*<div className={'cursor-pointer flex items-center pr-[6px] h-[24px] mb-[0.5px] rounded-sm bg-white border-[0.1px] shadow-[0_2px_3px_rgba(0,0,0,0.07)]'}>*/}
            {/*    <div className={'flex w-[24px] h-[24px] items-center justify-center'}>*/}
            {/*        <Image src={ShareSVG} alt={'share'} width={14} height={14}/>*/}
            {/*    </div>*/}
            {/*    <div className={'text-xs font-semibold'}>공유</div>*/}
            {/*</div>*/}
        </>
    );
};

export default TimelineHeader;
