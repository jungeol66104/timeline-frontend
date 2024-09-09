import React, {memo} from 'react';
import Image from "next/image";
import {Event} from "@/store/slices/contentsSlice";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const EventPreviewImage = memo(({event}: {event: Event}) => {
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType !== 'demo' ? event.cdnUrl! + event.imagePath! : event.imagePath!
    const alt = event.title

    return (
        <div className={`float-right relative ml-2 w-[80px] h-[80px]`}>
            <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>
        </div>
    );
});

export default EventPreviewImage;

EventPreviewImage.displayName = 'EventPreviewImage';