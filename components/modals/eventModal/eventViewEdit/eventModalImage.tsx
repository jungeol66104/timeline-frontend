import {getIsBaseImage} from "@/utils/global";
import React, {memo} from 'react';
import Image from "next/image";
import { Event } from "@/store/slices/contentsSlice"
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateShowGallery} from "@/store/slices/appearanceSlice";

const EventModalImage = memo(({ event } : {event: Event}) => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)

    const src = timelineType === 'demo' && !getIsBaseImage(event.imagePath!) ? event.imagePath! : event.cdnUrl! + event.imagePath!
    const alt = event.title
    const imageSize = event.imageSize || {width: 100, height: 100};

    const isBaseImage = getIsBaseImage(event.imagePath)

    return (
        <div className={`relative ${isBaseImage && 'hidden'}`}>
            <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width}/>
            <button onClick={() => {dispatch(updateShowGallery(true))}} className={'material-symbols-outlined text-[20px] text-white absolute bottom-3 right-3 w-9 h-9 bg-black hover:bg-gray-700 opacity-70 border-[0.1px] border-gray-700 rounded-md drop-shadow-sm'}>&#xe060;</button>
        </div>
    );
});

export default EventModalImage;

EventModalImage.displayName = 'EventModalImage';