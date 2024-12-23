import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {Timeline} from "@/store/slices/contentsSlice";

const TimelinesPreview = ({title, timelines}: {title: string, timelines: Timeline[]}) => {
    const href = title === 'Recently Added' ? '/?tagNum=1' : '/?tagNum=2'

    return (
        <div className={'relative p-3 flex flex-col gap-3 bg-[#F2F2F259] border-[1px] border-[#E5E7EB] rounded-2xl'}>
            <h3 className={'text-[20px] font-bold'}>{title}</h3>
            <div>
                {timelines.map((timeline, i) => {
                    const isBaseImage = getIsBaseImage(timeline.imagePath)

                    return (
                        <Link key={i} href={`/timelines/${timeline.timelinePath}`} className={'relative py-2 flex gap-2 justify-between hover:underline'}>
                            <div>
                                <div className={'font-medium line-clamp-1'}>{timeline.title}</div>
                                <div className={'line-clamp-1 text-sm text-gray-500'}>{timeline.description}</div>
                            </div>
                            <div className={'relative w-[44px] h-[44px] top-0 right-0 mb-[0.5px] shrink-0'}>
                                {isBaseImage
                                    ? <><div
                                        className={'relative w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}>
                                        <span className={'absolute'}>{timeline.title.charAt(0).toUpperCase()}</span>
                                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.title)}.jpg`} alt={'base-image'} width={44} height={44} priority={true} className={'rounded-md'}/>
                                    </div></>
                                    : <Image className={'rounded-md'} src={timeline.cdnUrl! + timeline.imagePath!} alt={timeline.title} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
                                }
                            </div>
                        </Link>
                    )})
                }
            </div>
            <Link href={href} className={'text-sm text-blue-700 hover:underline'}>Show more</Link>
        </div>
    );
};

export default TimelinesPreview;
