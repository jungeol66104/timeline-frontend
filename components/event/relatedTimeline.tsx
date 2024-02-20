import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";

const RelatedTimeline = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'flex flex-col gap-2.5'}>
            <h2 className={'text-xl font-bold'}>Related Timelines</h2>
            {currentEvent.timelines?.map((tI, i) => {
                    const isBaseImage = getIsBaseImage(tI.image)
                    return (
                        <Link key={i} href={`/timelines/${tI.id}`} className={'h-[65px] w-fit max-w-[300px] bg-white shadow-md rounded-lg border-[1px] flex gap-2.5 items-center px-2.5'}>
                            <div className={'shrink-0 w-[45px] h-[45px]'}>
                                {isBaseImage
                                    ?   <div className={'w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}><span>{tI.name.charAt(0).toUpperCase()}</span></div>
                                    :   <Image src={tI.image} alt={tI.name} width={45} height={45} className={'rounded-md'}/>
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


// {currentTimeline.id <= 10
//     ?   <Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} />
//     :   <div className={'w-full h-full rounded-sm bg-gray-500 text-white flex items-center justify-center text-sm font-medium hidden'}><span>{currentTimeline.name.charAt(0).toUpperCase()}</span></div>
// }