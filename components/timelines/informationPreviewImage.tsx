import React from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {Timeline} from "@/store/slices/contentsSlice";

const InformationPreviewImage = ({information}: {information: Timeline}) => {
    const src = information.image
    const alt = information.name
    const imageSize = information.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)
    const ratio = imageSize.width / imageSize.height
    const width = ratio <= 1 ? 108 : ratio <= 1.25 ? ratio * 108 : 135

    return (
        <div className={`${isBaseImage && 'hidden'} float-right relative ml-2 h-[108px]`} style={{width: width}}>
            <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>
        </div>
    );
};

export default InformationPreviewImage;
