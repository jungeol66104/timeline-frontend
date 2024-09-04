import React, {memo} from 'react';
import Image from "next/image";
import {Event} from "@/store/slices/contentsSlice";

const EventPreviewImage = memo(({event}: {event: Event}) => {
    const src = event.image as string
    const alt = event.name

    return (
        <div className={`float-right relative ml-2 w-[80px] h-[80px]`}>
            <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>
        </div>
    );
});

export default EventPreviewImage;

EventPreviewImage.displayName = 'EventPreviewImage';