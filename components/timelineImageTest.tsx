import React from 'react';
import {Timeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum, ratioToImageSizeType} from "@/utils/global";
import Image from "next/image";

// const TimelineImage = ({timeline, size} : {timeline: Timeline, size: number}) => {
//     const isBaseImage = getIsBaseImage(timeline.image)
//     let imageSizeType = 'square'
//     if (timeline.imageSize) imageSizeType = ratioToImageSizeType(timeline.imageSize)
//
//     return (
//         <div className={`relative shrink-0 ${imageSizeType === 'horizontal' ? 'w-[240px] h-[200px]' : imageSizeType === 'vertical' ? 'w-[200px] h-[240px]' : 'w-[200px] h-[200px]'}`}>
//             {isBaseImage
//                 ? <><div className={'relative w-full h-full rounded-lg bg-gray-500 text-white flex items-center justify-center'}>
//                     <div className={'absolute text-md font-medium text-center opacity-50'}>No Image</div>
//                     <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} width={250} height={250} priority={true} className={'rounded-lg'}/>
//                 </div></>
//                 : <Image className={'rounded-lg shrink-0'} src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
//             }
//         </div>
//     );
// };

// props: name, url, originalSize, desiredSize, imageSizeType, baseImageType
const TimelineImageTest = ({name, url, targetLength, originalSize, imageSizeType, baseImageType='firstLetter'}: TimelineImageProps) => {
    const isBaseImage = getIsBaseImage(url)
    imageSizeType = 'square'
    if (originalSize) imageSizeType = ratioToImageSizeType(originalSize)

    return (
    <div className={`relative shrink-0 ${imageSizeType === 'horizontal' ? 'w-[240px] h-[200px]' : imageSizeType === 'vertical' ? 'w-[200px] h-[240px]' : 'w-[200px] h-[200px]'}`}>
        {isBaseImage
            ? <><div className={'relative w-full h-full rounded-lg bg-gray-500 text-white flex items-center justify-center'}>
                <div className={'absolute text-md font-medium text-center opacity-50'}>No Image</div>
                <Image src={`/images/base-image/base-image${mapStrToNum(name)}.jpg`} alt={'base-image'} width={250} height={250} priority={true} className={'rounded-lg'}/>
            </div></>
            : <Image className={'rounded-lg shrink-0'} src={url} alt={name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
        }
    </div>
);
};

export default TimelineImageTest;

interface TimelineImageProps {
    name: string;
    url: string;
    targetLength: number;
    originalSize: {width: number, height: number};
    imageSizeType?: string;
    baseImageType?: string;
}