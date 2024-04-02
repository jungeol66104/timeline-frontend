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
                    <span className={'text-sm line-clamp-5'}>
                        Muhammad bin Salman, born in 1985, is a prominent Saudi Arabian royal and politician, known for his ambitious reform agenda and his role as Crown Prince since 2017.
                        He has spearheaded the Vision 2030 program aimed at diversifying the Saudi economy and modernizing society.
                        While praised for his efforts, he has also faced criticism for alleged human rights abuses and his involvement in controversial incidents, such as the murder of journalist Jamal Khashoggi in 2018.
                        Nonetheless, he remains a significant figure both domestically and internationally, shaping Saudi Arabia's future trajectory and its relations with the global community.
                    </span>
                    <button className={'text-sm text-blue-700 hover:underline'}>Show more</button>
                </div>
                <div className={'w-[100px] h-[100px] top-0 right-0 mb-[0.5px] shrink-0'}>
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
