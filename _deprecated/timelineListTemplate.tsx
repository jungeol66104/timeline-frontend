import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";

const TimelineListTemplate = ({title, timelines}: {title: string, timelines: any[]}) => {
    const href = title === 'Recently Added' ? '/?tagNum=1' : '/?tagNum=2'

    return (
        <div className={'relative mb-3'}>
            <h3 className={'text-[20px] font-bold py-3'}>{title}</h3>
            {timelines.map((timeline, i) => {
                const isBaseImage = getIsBaseImage(timeline.image)

                return (
                    <Link key={i} href={`/timelines/${timeline.id}`} className={'relative py-2 flex justify-between hover:underline'}>
                        <div>
                            <div className={'font-medium line-clamp-1'}>{timeline.name}</div>
                            <div className={'line-clamp-1 text-sm text-gray-500'}>{timeline.description}</div>
                        </div>
                        <div className={'relative w-[44px] h-[44px] top-0 right-0 mb-[0.5px] shrink-0'}>
                            {isBaseImage
                                ? <><div
                                        className={'relative w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}>
                                        <span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>
                                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} width={44} height={44} priority={true} className={'rounded-md'}/>
                                    </div></>
                                : <Image className={'rounded-md'} src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
                            }
                        </div>
                    </Link>
                )})
            }
            <Link href={href} className={'text-sm text-blue-700 hover:underline py-2'}>Show more</Link>
        </div>
    );
};

export default TimelineListTemplate;
