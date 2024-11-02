import React from "react";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";

const LinkPopoverSearchContent = ({searchResult, handleClick}: {searchResult: any, handleClick: any}) => {
    const isBaseImage = getIsBaseImage(searchResult.imagePath)

    return (
        <button onClick={() => handleClick('timeline', `/timelines/${searchResult.timelinePath}`, searchResult.title)} className={'p-1.5 w-full flex items-center gap-2.5 hover:bg-gray-100 rounded-sm'}>
            <div className={'relative shrink-0 w-[24px] h-[24px]'}>
                {isBaseImage
                    ?   <>
                        <div className={'relative w-[24px] h-[24px] rounded-sm text-white flex items-center justify-center text-sm'}>
                            <span className={'absolute'}>{searchResult.title.charAt(0).toUpperCase()}</span>
                            <Image src={`/images/base-image/base-image${mapStrToNum(searchResult.title)}.jpg`} alt={'base-image'} width={24} height={24} priority={true} className={'rounded-sm bg-gray-100'} />
                        </div>
                    </>
                    :   <Image className={'rounded-sm bg-gray-100'} src={searchResult.cdnUrl + searchResult.imagePath} alt={searchResult.title} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
            <div className={'w-full text-start text-sm font-medium flex-1 line-clamp-1'} >{searchResult.title}</div>
        </button>
    )
}
export default LinkPopoverSearchContent