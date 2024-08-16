import React from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {TimelineEvent} from "@/store/slices/contentsSlice";

const EventPreviewImage = ({event}: {event: TimelineEvent}) => {
    const src = event.image as string
    const alt = event.name

    return (
        <div className={`float-right relative ml-2 w-[80px] h-[80px]`}>
            <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>
        </div>
    );
};

export default EventPreviewImage;
