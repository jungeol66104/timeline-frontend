import React from 'react';
import Image from "next/image";
import Link from "next/link";

interface TemporaryTimeline {
    id: number
    name: string
    description: string
}

const SwiperCard = ({timeline} : {timeline: TemporaryTimeline}) => {
    return (
        <div className={'swiperCard relative shrink-0 rounded-xl shadow-md'} >
            <Link href={`/timelines/1`}>
            <Image src={`/images/timeline/${timeline.id}.png`} alt={timeline.name} fill className={'rounded-xl'}/>
                <div className={'absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-b from-transparent via-50% via-transparent to-black opacity-80'}></div>
                <div className={'absolute bottom-0 left-0 w-full p-2.5 font-semibold text-white'}>
                    <div className={'font-semibold text-white line-clamp-1 text-[14px]'}>{timeline.name}</div>
                    <div className={'font-medium text-white text-[12px] line-clamp-1 opacity-90'}>{timeline.description}</div>
                </div>
            </Link>
        </div>
    );
};

export default SwiperCard;
