import {getIsBaseImage} from "@/utils/global";
import React, {memo} from 'react';
import Image from "next/image";
import { Event } from "@/store/slices/contentsSlice"
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const EventModalImage = memo(({ event } : {event: Event}) => {
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType !== 'demo' ? event.cdnUrl! + event.imagePath! : event.imagePath!
    const alt = event.title
    const imageSize = event.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(event.imagePath)

    return (
        <div className={`relative ${(isBaseImage || imageSize === undefined) && 'hidden'}`}>
            <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width}/>
        </div>
    );
});

export default EventModalImage;

EventModalImage.displayName = 'EventModalImage';