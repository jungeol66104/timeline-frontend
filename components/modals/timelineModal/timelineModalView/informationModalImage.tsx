import React from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";

const InformationModalImage = ({src, alt, imageSize} : {src: string, alt: string, imageSize: any}) => {
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative ${!isBaseImage && 'mt-3'}`}>
            {!isBaseImage && imageSize !== undefined && <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width} />}
        </div>
    );
};

export default InformationModalImage;
