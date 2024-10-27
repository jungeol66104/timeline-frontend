import React, {memo} from 'react';
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import {Timeline, Event} from "@/store/slices/contentsSlice";

import {getIsBaseImage} from "@/utils/global";

const galleryImage = memo(({imageTarget} : {imageTarget : Timeline | Event}) => {
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType === 'demo' && !getIsBaseImage(imageTarget.imagePath!) ? imageTarget.imagePath! : imageTarget.cdnUrl! + imageTarget.imagePath!
    const alt = imageTarget.title
    const imageSize = imageTarget.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`${isBaseImage && 'hidden'} relative h-[calc(100%-120px)] flex items-center justify-center`}>
            <Image className={`max-h-full`} src={src} alt={alt} width={imageSize.width} height={imageSize.height} style={{objectFit: "contain"}} priority/>
        </div>
    );
});

export default galleryImage;

galleryImage.displayName = 'GalleryImage';