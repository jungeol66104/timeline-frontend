import React, {useLayoutEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage, mapStrToNum, ratioToImageSizeType} from "@/utils/global";
import Image from "next/image";


const ImageTest = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isBaseImage = getIsBaseImage(currentTimeline.image)
    const [imageSizeType, setImageSizeType] = useState('square')

    useLayoutEffect(() => {
        ratioToImageSizeType(currentTimeline.image, (ratio) => {setImageSizeType(ratio)})
    }, [currentTimeline.image])

    return (
        <div className={`relative float-right ${imageSizeType === 'square' ? 'w-[100px] h-[100px] min-[432px]:w-[120px] min-[432px]:h-[120px]' : imageSizeType === 'horizontal' ? 'w-[120px] h-[100px] min-[432px]:w-[144px] min-[432px]:h-[120px]' : 'w-[100px] h-[120px] min-[432px]:w-[100px] min-[432px]:h-[120px]'} ml-2.5 shrink-0`}>
            {isBaseImage
                ? <>
                    <div className={'relative w-full h-full rounded-md flex items-center justify-center'}>
                        <span className={'absolute text-white text-sm font-medium'}>{currentTimeline.name.charAt(0).toUpperCase()}</span>
                        <Image src={`/images/base-image/base-image${mapStrToNum(currentTimeline.name)}.jpg`} alt={'base-image'} width={144} height={144} priority={true} className={'rounded-md bg-gray-500'}/>
                    </div>
                </>
                : <Image className={'rounded-md shrink-0'} src={currentTimeline.image} alt={currentTimeline.name} fill={true} style={{objectFit: "cover", objectPosition: "top"}}/>
            }
        </div>
    );
};

export default ImageTest;
