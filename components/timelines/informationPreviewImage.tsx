import React, {memo} from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {Timeline} from "@/store/slices/contentsSlice";
import AddImageButton from "@/components/common/addImageButton";

const InformationPreviewImage = memo(({information}: {information: Timeline}) => {
    const src = "https://" + information.cdnUrl + information.imagePath
    const alt = information.title
    const imageSize = information.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)
    const ratio = imageSize.width / imageSize.height
    let mobileWidth = ratio <= 1 ? 80 : ratio <= 1.25 ? ratio * 80 : 100;
    let pcWidth = ratio <= 1 ? 108 : ratio <= 1.25 ? ratio * 108 : 135;

    return (
        <>
            <div className={`max-[630px]:hidden float-right relative ml-2 h-[108px]`} style={{width: pcWidth}}>
                {isBaseImage && <div className={'p-1 w-full h-full flex items-start justify-end bg-gray-100 rounded-md border-[1px] border-gray-300'}><AddImageButton /></div>}
                {!isBaseImage && <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
            <div className={`min-[630px]:hidden float-right relative ml-2 h-[80px]`} style={{width: mobileWidth}}>
                {isBaseImage && <div className={'p-1 w-full h-full flex items-start justify-end bg-gray-100 rounded-md border-[1px] border-gray-300'}><AddImageButton /></div>}
                {!isBaseImage && <Image className={'rounded-md bg-gray-100'} src={src} alt={alt} fill priority style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
        </>
    );
});

export default InformationPreviewImage;

InformationPreviewImage.displayName = 'InformationPreviewImage';