import React from 'react';
import Image from 'next/image'
import {getIsBaseImage} from "@/utils/global";

const EventContentImage = ({src, alt} : {src: string | undefined, alt: string}) => {
    const isBaseImage = getIsBaseImage(src)
    if (src === undefined || isBaseImage) return

    return (
        <div className={'relative w-[84px] h-[84px] shrink-0'}>
            <Image src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}} className={'rounded-md'}/>
        </div>
    );
};

export default EventContentImage;
