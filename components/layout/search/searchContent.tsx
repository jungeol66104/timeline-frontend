import Link from "next/link";
import Image from "next/image";
import React from "react";
import {useSelector} from "react-redux";
import {selectTab} from "@/store/slices/searchSlice";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
// refactoring: clear

const SearchContent = ({searchResult}: {searchResult: any}) => {
    const isBaseImage = getIsBaseImage(searchResult.imageUrl)

    return (
        <Link href={`/timelines/${searchResult.id}`} className={'flex items-center py-1.5 gap-2.5'}>
            <div className={'relative shrink-0 w-[28px] h-[28px]'}>
                {isBaseImage
                    ?   <>
                            <div className={'relative w-[28px] h-[28px] rounded-sm text-white flex items-center justify-center text-sm'}>
                                <span className={'absolute'}>{searchResult.name.charAt(0).toUpperCase()}</span>
                                <Image src={`/images/base-image/base-image${mapStrToNum(searchResult.name)}.jpg`} alt={'base-image'} width={28} height={28} priority={true} className={'rounded-sm'} />
                            </div>
                        </>
                    :   <Image className={'rounded-sm'} src={searchResult.imageUrl} alt={searchResult.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>}
            </div>
            <div className={'font-medium flex-1 line-clamp-1'} >{searchResult.name}</div>
        </Link>
    )
}
export default SearchContent