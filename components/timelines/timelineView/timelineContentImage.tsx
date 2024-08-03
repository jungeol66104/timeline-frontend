import React from 'react';
import Image from "next/image";
import {getIsBaseImage, ratioToImageSizeType} from "@/utils/global";
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import AddImageButton from "@/components/common/addImageButton";
import ImageEditButtons from "@/components/common/ImageEditButtons";

const TimelineContentImage = ({src, alt, imageSize} : {src: string, alt: string, imageSize: any}) => {
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const isBaseImage = getIsBaseImage(src)
    let imageSizeType = 'square'
    if (imageSize) imageSizeType = ratioToImageSizeType(imageSize)

    return (
        <div className={`relative float-right ml-2.5 ${isBaseImage && !isTimelineEditable && 'hidden'} ${imageSizeType === 'horizontal' ? 'w-[120px] h-[100px] min-[432px]:w-[144px] min-[432px]:h-[120px]' : imageSizeType === 'vertical' ? 'w-[100px] h-[120px] min-[432px]:w-[100px] min-[432px]:h-[120px]' : 'w-[100px] h-[100px] min-[432px]:w-[120px] min-[432px]:h-[120px]'} shrink-0`}>
            {isBaseImage
                ?   <div className={'p-1 w-full h-full flex items-start justify-end bg-gray-300 rounded-md border-[1px] border-gray-300'}><AddImageButton src={src} /></div>
                :   <Image className={'rounded-md bg-gray-100 shrink-0'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>
            }
            {isTimelineEditable && !isBaseImage && <ImageEditButtons />}
        </div>
    );
};

export default TimelineContentImage;
