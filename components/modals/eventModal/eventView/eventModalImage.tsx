import {getIsBaseImage} from "@/utils/global";
import React, {memo} from 'react';
import Image from "next/image";
import { Event } from "@/store/slices/contentsSlice"

const EventModalImage = memo(({ event } : {event: Event}) => {
    const src = "https://" + event.cdnUrl + event.imagePath
    const alt = event.title
    const imageSize = event.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(event.imagePath)

    return (
        <div className={`relative ${!isBaseImage && 'mt-3'}`}>
            {!isBaseImage && imageSize !== undefined && <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width} />}
        </div>
    );
});

export default EventModalImage;

EventModalImage.displayName = 'EventModalImage';