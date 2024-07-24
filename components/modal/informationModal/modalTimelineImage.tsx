import React from 'react';
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import ReplaceImageButton from "@/components/modal/replaceImageButton";
import RemoveImageButton from "@/components/modal/removeImageButton";

const ModalImage = ({src, alt, imageSize} : {src: string, alt: string, imageSize: any}) => {
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const isBaseImage = getIsBaseImage(src)

    return (
        <div className={`relative ${!isBaseImage && 'mt-3'}`}>
            {isBaseImage || imageSize === undefined
                ?   <></>
                :   <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width} />
            }
            {isTimelineEditable && !isBaseImage &&
                <div className={`absolute top-4 right-4 flex items-center h-[36px] border-[0.1px] border-gray-300 drop-shadow-sm rounded-md opacity-70`}>
                    <ReplaceImageButton />
                    <RemoveImageButton />
                </div>
            }
        </div>
    );
};

export default ModalImage;
