import React from 'react';
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import ImageEditButtons from "@/components/common/edit/ImageEditButtons";

const TimelineModalImage = ({src, alt, imageSize} : {src: string, alt: string, imageSize: any}) => {
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative ${!isBaseImage && 'mt-3'}`}>
            {!isBaseImage && imageSize !== undefined && <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width} />}
            {isTimelineEditable && !isBaseImage && <ImageEditButtons />}
        </div>
    );
};

export default TimelineModalImage;
