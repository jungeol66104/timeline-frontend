import React, {memo} from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateShowGallery} from "@/store/slices/appearanceSlice";
import {Timeline} from "@/store/slices/contentsSlice";

import {getIsBaseImage} from "@/utils/global";

const galleryImage = memo(({information} : {information : Timeline}) => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType === 'demo' && !getIsBaseImage(information.imagePath!) ? information.imagePath! : information.cdnUrl! + information.imagePath!
    const alt = information.title
    const imageSize = information.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative w-full h-[calc(100%-90px)] ${isBaseImage && 'hidden'}`}>
            <Image src={src} alt={alt} fill style={{objectFit: "contain"}} priority/>
        </div>
    );
});

export default galleryImage;

galleryImage.displayName = 'GalleryImage';