import React from 'react'
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import Link from "next/link";
import Image from "next/image";

const TimelineInformation = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isBaseImage = getIsBaseImage(currentTimeline.image)

    return (
        <div className={'timelineInformation mb-4'}>
            <h1 className={'text-2xl font-bold'}>{currentTimeline.name}</h1>
            <div className={'text-md text-gray-500'}>{currentTimeline.description}</div>
            <div className={'mt-2.5 flex gap-2.5'}>
                <div className={''}>
                    <span className={'text-md line-clamp-5'}>
                        The Asian Financial Crisis was a major economic event that occurred primarily in East and Southeast Asian countries during the late 1990s. The crisis originated in Thailand in July 1997 when the Thai baht was floated after being pegged to the US dollar.
                        This sudden devaluation triggered a domino effect across the region, leading to severe financial instability and economic downturns in countries such as Indonesia, South Korea, Malaysia, and the Philippines.
                    </span>
                    <button className={'text-blue-700 hover:underline'}>Show more</button>
                </div>
                <div className={'w-[144px] h-[144px] top-0 right-0 mb-[0.5px] shrink-0'}>
                    {isBaseImage
                        ?   <>
                                <div className={'relative w-full h-full rounded-sm bg-gray-500 text-white flex items-center justify-center text-sm font-medium'}>
                                    <span className={'absolute'}>{currentTimeline.name.charAt(0).toUpperCase()}</span>
                                    <Image src={`/images/base-image/base-image${mapStrToNum(currentTimeline.name)}.jpg`} alt={'base-image'} width={144} height={144} priority={true} className={'rounded-sm'}/>
                                </div>
                            </>
                        :   <Image className={'rounded-xl'} src={currentTimeline.image} alt={currentTimeline.name} width={144} height={144}/>
                    }
                </div>
            </div>
        </div>
    )
}
export default TimelineInformation
