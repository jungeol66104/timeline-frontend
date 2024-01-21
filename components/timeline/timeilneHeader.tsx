import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import ShareSVG from "@/public/svg/share.svg"
import {updateIsShare} from "@/store/slices/appearanceSlice";
import Link from "next/link";

const TimelineHeader = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)

    const handleClick = async () => {
        if ('share' in navigator && !window.matchMedia('(hover: hover)').matches) {
            const title = document.title;
            const text = document.title;
            const url = location.href;
            try {
                await navigator.share({url , text, title});
                return
            } catch (error) {
                console.error('Error fetching for web share api: ', error)
                return
            }
        } else dispatch(updateIsShare())
        return
    }

    return (
        <div className={'relative w-fit flex gap-2.5 items-center'} style={{zIndex: 2000}}>
            <Link onClick={() => sessionStorage.clear()} href={`/timelines/${currentTimeline.id}`} className={`relative w-fit font-black text-2xl`}>
                <div className={'flex gap-2.5 items-center'}>
                    <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
                    <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px]'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} /></div>
                </div>
            </Link>
            <div onClick={handleClick} className={'cursor-pointer flex items-center pr-[6px] h-[24px] mb-[0.5px] rounded-sm bg-white border-[0.1px] shadow-[0_2px_3px_rgba(0,0,0,0.07)]'}>
                <div className={'flex w-[24px] h-[24px] items-center justify-center'}>
                    <Image src={ShareSVG} alt={'share'} width={14} height={14}/>
                </div>
                <div className={'text-xs font-semibold'}>공유</div>
            </div>
        </div>
    );
};

export default TimelineHeader;
