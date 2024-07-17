import React from 'react';
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";

const ModalImage = ({src, alt, imageSize} : {src: string, alt: string, imageSize: any}) => {
    const contentType = useSelector(selectModalContentType)
    const isBaseImage = getIsBaseImage(src)
    console.log(imageSize)

    return (
        <div className={`relative ${!isBaseImage && 'mt-3'}`}>
            {isBaseImage || imageSize === undefined
                ?   <></>
                :   <Image className={'max-h-[400px] w-auto'} src={src} alt={alt} priority height={imageSize.height} width={imageSize.width} />
            }
            {contentType === 'edit' && !isBaseImage &&
                <div className={`absolute top-4 right-4 flex items-center h-[36px] border-[0.1px] border-gray-300 drop-shadow-sm rounded-md opacity-70`}>
                    <button className={'px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100 border-r-[1px] border-gray-300 rounded-l-md'}><div className={'material-symbols-outlined text-[20px]'}>&#xe863;</div></button>
                    <button className={'px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100 rounded-r-md'}><div className={'material-symbols-outlined text-[22px]'}>&#xe15b;</div></button>
                </div>
            }
        </div>
    );
};

export default ModalImage;
