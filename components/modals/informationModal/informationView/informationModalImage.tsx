import React, {memo} from 'react';
import Image from "next/image";
import {getIsBaseImage} from "@/utils/global";
import {Timeline} from "@/store/slices/contentsSlice";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const InformationModalImage = memo(({information} : {information : Timeline}) => {
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType !== 'demo' ? information.cdnUrl! + information.imagePath! : information.imagePath!
    const alt = information.title
    const imageSize = information.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative ${(isBaseImage || imageSize === undefined) && 'hidden'}`}>
            <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width}/>
        </div>
    );
});

export default InformationModalImage;

InformationModalImage.displayName = 'InformationModalImage';