import React from 'react';
import Image from "next/image";
import SwiperCard from "@/components/swiperCard";

interface TemporarySeries {
    name: string
    description: string
    timelines: TemporaryTimeline[]
}

interface TemporaryTimeline {
    id: number
    name: string
    description: string
}

const Swiper = ({series}: {series: TemporarySeries}) => {
    return (
        <div className={'my-[20px]'}>
            <div className={'pl-5'}>
                <div className={'text-sm text-gray-500'}>{series.description}</div>
                <div className={'text-2xl font-bold'}>{series.name}</div>
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
