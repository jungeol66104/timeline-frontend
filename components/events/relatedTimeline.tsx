import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";

const RelatedTimeline = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'flex flex-col gap-2.5'}>
            <h2 className={'text-xl font-bold'}>Related Timelines</h2>
            {currentEvent.timelines?.map((tI, i) => {
                    const isBaseImage = getIsBaseImage(tI.image)

                    return (
                        <Link key={i} href={`/timelines/${tI.id}`} className={'h-[65px] w-fit max-w-[300px] bg-white shadow-md rounded-lg border-[1px] flex gap-2.5 items-center px-2.5'}>
                            <div className={'relative shrink-0 w-[45px] h-[45px]'}>
                                {isBaseImage
                                    ?   <>
                                            <div className={'relative w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}>
                                                <span className={'absolute'}>{tI.name.charAt(0).toUpperCase()}</span>
                                                <Image src={`/images/base-image/base-image${mapStrToNum(tI.name)}.jpg`} alt={'base-image'} width={45} height={45} priority={true} className={'rounded-md'} />
                                            </div>
                                        </>
                                    :   <Image src={tI.image} alt={tI.name} className={'rounded-md'} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
                                }
                            </div>
                            <div>
                                <div className={'font-semibold line-clamp-1 text-md'}>{tI.name}</div>
                                <div className={'text-sm line-clamp-1 opacity-90'} style={{}}>{tI.description}</div>
                            </div>
                        </Link>)
                })
            }
        </div>
    );
};

export default RelatedTimeline;