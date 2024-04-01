import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import {updateIsShare} from "@/store/slices/appearanceSlice";
import Link from "next/link";
import {getClickOrTouch, getIsBaseImage, getScrollWrapper, mapStrToNum} from "@/utils/global";

const TimelineHeader = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isBaseImage = getIsBaseImage(currentTimeline.image)

    return (
        <div className={'timelineHeader h-[60px] bg-white relative w-full flex gap-2.5 items-center'} style={{zIndex: 4999}}>
            <Link href={`/timelines/${currentTimeline.id}`} className={`w-fit font-black text-2xl cursor-pointer`}>
                <div className={'flex gap-2.5 items-center'}>
                    <div className={'text-2xl font-bold line-clamp-1'}>{currentTimeline.name}</div>
                    <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px] shrink-0'}>
                        {isBaseImage
                            ?   <>
                                    <div className={'relative w-full h-full rounded-sm bg-gray-500 text-white flex items-center justify-center text-sm font-medium'}>
                                        <span className={'absolute'}>{currentTimeline.name.charAt(0).toUpperCase()}</span>
                                        <Image src={`/images/base-image/base-image${mapStrToNum(currentTimeline.name)}.jpg`} alt={'base-image'} width={28} height={28} priority={true} className={'rounded-sm'} />
                                    </div>
                                </>
                            :   <Image className={'rounded-sm'} src={currentTimeline.image} alt={currentTimeline.name} width={28} height={28} />
                    }
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TimelineHeader;
