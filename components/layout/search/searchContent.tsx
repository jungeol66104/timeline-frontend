import React from "react";
import Link from "next/link";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
// should apply timelinePath rather than id

const SearchContent = ({searchResult}: {searchResult: any}) => {
    const isBaseImage = getIsBaseImage(searchResult.imagePath)

    return (
        <Link href={`/timelines/${searchResult.id}`} className={'flex items-center py-1.5 gap-2.5'}>
            <div className={'relative shrink-0 w-[28px] h-[28px]'}>
                {isBaseImage
                    ?   <>
                            <div className={'relative w-[28px] h-[28px] rounded-sm text-white flex items-center justify-center text-sm'}>
                                <span className={'absolute'}>{searchResult.title.charAt(0).toUpperCase()}</span>
                                <Image src={`/images/base-image/base-image${mapStrToNum(searchResult.title)}.jpg`} alt={'base-image'} width={28} height={28} priority={true} className={'rounded-sm bg-gray-100'} />
                            </div>
                        </>
                    :   <Image className={'rounded-sm bg-gray-100'} src={searchResult.cdnUrl + searchResult.imagePath} alt={searchResult.title} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
            <div className={'font-medium flex-1 line-clamp-1'} >{searchResult.title}</div>
        </Link>
    )
}
export default SearchContent