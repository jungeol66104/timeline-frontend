import React, {useLayoutEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline, Timeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum, ratioToImageSizeType} from "@/utils/global";
import Image from "next/image";


const InformationContentImage = ({timeline}: {timeline: Timeline}) => {
    const isBaseImage = getIsBaseImage(timeline.image)
    let imageSizeType = 'square'
    if (timeline.imageSize) imageSizeType = ratioToImageSizeType(timeline.imageSize)

    return (
        <div className={`relative float-right ${isBaseImage && 'hidden'} ${imageSizeType === 'horizontal' ? 'w-[120px] h-[100px] min-[432px]:w-[144px] min-[432px]:h-[120px]' : imageSizeType === 'vertical' ? 'w-[100px] h-[120px] min-[432px]:w-[100px] min-[432px]:h-[120px]' : 'w-[100px] h-[100px] min-[432px]:w-[120px] min-[432px]:h-[120px]'} ml-2.5 shrink-0`}>
            {isBaseImage
                ? <><div className={'relative w-full h-full rounded-md flex items-center justify-center'}>
                        {/*<span className={'absolute text-white text-sm font-medium'}>{timeline.name.charAt(0).toUpperCase()}</span>*/}
                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} width={144} height={144} priority={true} className={'rounded-md bg-gray-500'}/>
                    </div></>
                : <Image className={'rounded-md shrink-0'} src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
            }
        </div>
    );
};

export default InformationContentImage;
