import React, {memo} from 'react';
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateShowGallery} from "@/store/slices/appearanceSlice";
import {Timeline} from "@/store/slices/contentsSlice";

import {getIsBaseImage} from "@/utils/global";

const InformationModalImage = memo(({information} : {information : Timeline}) => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType === 'demo' && !getIsBaseImage(information.imagePath!) ? information.imagePath! : information.cdnUrl! + information.imagePath!
    const alt = information.title
    const imageSize = information.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative ${isBaseImage && 'hidden'}`}>
            <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} height={imageSize.height} width={imageSize.width} priority/>
            <button onClick={() => {dispatch(updateShowGallery(true))}} className={'material-symbols-outlined text-[20px] text-white absolute bottom-3 right-3 w-9 h-9 bg-black hover:bg-gray-700 opacity-70 border-[0.1px] border-gray-700 rounded-md drop-shadow-sm'}>&#xe060;</button>
        </div>
    );
});

export default InformationModalImage;

InformationModalImage.displayName = 'InformationModalImage';