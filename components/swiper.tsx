import React from 'react';
import SwiperCard from "@/components/swiperCard";
import Image from "next/image";


const Swiper = ({series}: {series: Series}) => {
    const showMoreButton = series.timelines.length
    return (
        <div className={'my-[20px]'}>
            <div className={'pl-5 w-full'}>
                <div className={'text-sm text-gray-500'}>{series.description}</div>
                <div className={'flex items-center justify-between'} style={{width: `calc(100% - 30px)`}}>
                    <div className={'text-2xl font-bold'}>{series.name}</div>
                    {/*<div className={'flex gap-2.5'}>*/}
                    {/*    <button className={'flex items-center justify-center w-[32px] h-[32px] rounded-full border-[1px] bg-white hover:bg-gray-100'}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} /></button>*/}
                    {/*    <button className={'flex items-center justify-center w-[32px] h-[32px] rounded-full border-[1px] bg-white hover:bg-gray-100'}><Image src={'/svg/after.svg'} alt={'after'} height={20} width={20} /></button>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className={'swiperContainer w-full flex px-5 pb-2.5 mt-2.5 overflow-x-scroll'}>
                {series["timelines"].map((timeline, i) => {
                    return <SwiperCard key={i} timeline={timeline}/>
                })}
            </div>
        </div>
    );
};

export default Swiper;

interface Series {
    id: number
    name: string
    description: string
    timelines: SeriesTimeline[]
}

interface SeriesTimeline {
    id: number
    name: string
    description: string
    image: string
}