import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {getIsBaseImage} from "@/utils/global";

interface SeriesTimeline {
    id: number
    name: string
    description: string
    image: string
}

const SwiperCard = ({timeline} : {timeline: SeriesTimeline}) => {
    const isBaseImage = getIsBaseImage(timeline.image)
    return (
            <Link href={`/timelines/${timeline.id}`} className={'swiperCard relative shrink-0 rounded-xl shadow-md'}>
                {isBaseImage
                    ?   <div className={'absolute top-0 h-full w-full rounded-xl bg-gray-500'}></div>
                    :   <>
                            <Image src={timeline.image} alt={timeline.name} fill sizes={"(min-width: 520px) 137px, calc(48vw - 38px)"} priority={true} quality={100} className={'rounded-xl'} />
                            <div className={'absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-b from-transparent via-50% via-transparent to-black opacity-80'}></div>
                        </>
                }
                    <div className={'absolute bottom-0 left-0 w-full p-2.5'}>
                        <div className={'font-semibold text-white line-clamp-1 text-[14px]'}>{timeline.name}</div>
                        <div className={'font-medium text-white text-[12px] line-clamp-1 opacity-90'}>{timeline.description}</div>
                    </div>
            </Link>
    );
};

export default SwiperCard;
