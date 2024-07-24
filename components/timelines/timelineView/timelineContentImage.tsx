import React from 'react';
import Image from "next/image";
import {getIsBaseImage, mapStrToNum, ratioToImageSizeType} from "@/utils/global";
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";

const TimelineContentImage = ({src, alt, imageSize} : {src: string, alt: string, imageSize: any}) => {
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const isBaseImage = getIsBaseImage(src)
    let imageSizeType = 'square'
    if (imageSize) imageSizeType = ratioToImageSizeType(imageSize)

    const handleClick = () => {}

    return (
        <div className={`relative float-right ml-2.5 ${isBaseImage && !isTimelineEditable && 'hidden'} ${imageSizeType === 'horizontal' ? 'w-[120px] h-[100px] min-[432px]:w-[144px] min-[432px]:h-[120px]' : imageSizeType === 'vertical' ? 'w-[100px] h-[120px] min-[432px]:w-[100px] min-[432px]:h-[120px]' : 'w-[100px] h-[100px] min-[432px]:w-[120px] min-[432px]:h-[120px]'} shrink-0`}>
            {isBaseImage
                ?   <div className={'relative w-full h-full rounded-md flex items-center justify-center'}>
                        {/*<Image src={`/images/base-image/base-image${mapStrToNum(alt)}.jpg`} alt={'base-image'} width={144} height={144} priority={true} className={'rounded-md bg-gray-100'}/>*/}
                    <div className={'w-full h-full flex items-end justify-end bg-gray-300 rounded-md border-[1px] border-gray-300'}>
                        <button onClick={handleClick} className={`px-2 flex items-center justify-center gap-1.5 h-[36px] bg-white hover:bg-gray-100 rounded-br-md`}>
                            <div className={'material-symbols-outlined text-[20px]'}>&#xe43e;</div>
                        </button>
                    </div>
                </div>
                : <Image className={'rounded-md bg-gray-100 shrink-0'} src={src} alt={alt} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
            }
        </div>
    );
};

export default TimelineContentImage;
