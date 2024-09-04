import React, {memo} from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {Timeline} from "@/store/slices/contentsSlice";

const InformationModalImage = memo(({information} : {information : Timeline}) => {
    const src = "https://" + information.cdnUrl + information.imagePath
    const alt = information.title
    const imageSize = information.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative ${!isBaseImage && 'mt-3'}`}>
            {!isBaseImage && imageSize !== undefined && <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width} />}
        </div>
    );
});

export default InformationModalImage;

InformationModalImage.displayName = 'InformationModalImage';