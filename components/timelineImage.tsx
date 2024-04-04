import React from 'react';
import Image from 'next/image'
import {Timeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";

const TimelineImage = ({timeline, size} : {timeline: Timeline, size: number}) => {
    const isBaseImage = getIsBaseImage(timeline.image)

    return (
        <div className={'top-0 right-0 shrink-0'} style={{width: size, height: size}}>
            {isBaseImage
                ? <><div className={'relative w-full h-full rounded-sm bg-gray-500 text-white flex items-center justify-center text-sm font-medium'}>
                        <span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>
                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} width={250} height={250} priority={true} className={'rounded-md'}/>
                    </div></>
                : <Image className={'rounded-md'} src={timeline.image} alt={timeline.name} width={250} height={250}/>
            }
        </div>
    );
};

export default TimelineImage;
