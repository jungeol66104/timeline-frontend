import Link from "next/link";
import Image from "next/image";
import React from "react";
import {useSelector} from "react-redux";
import {selectTab} from "@/store/slices/searchSlice";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
// refactoring: clear

const SearchContent = ({searchResult}: {searchResult: any}) => {
    const tab = useSelector(selectTab)
    const isBaseImage = tab === 'timeline' && getIsBaseImage(searchResult.imageUrl)

    return (
        <Link href={ tab === 'timeline' ? `/timelines/${searchResult.id}` : `/events/${searchResult.id}`}>
            <div className={'flex items-center pt-[6px] pb-[6px] gap-2.5'}>
                {tab === 'timeline' &&
                    <>{isBaseImage
                        ?   <>
                                <div className={'relative w-[28px] h-[28px] rounded-sm text-white flex items-center justify-center text-sm'}>
                                    <span className={'absolute'}>{searchResult.name.charAt(0).toUpperCase()}</span>
                                    <Image src={`/images/base-image/base-image${mapStrToNum(searchResult.name)}.jpg`} alt={'base-image'} width={28} height={28} priority={true} className={'rounded-sm'} />
                                </div>
                            </>
                        :   <Image className={'rounded-sm'} src={searchResult.imageUrl} alt={searchResult.name} width={28} height={28} priority={true}/>
                    }</>}
                <div className={'font-medium flex-1 line-clamp-1'} >{searchResult.name}</div>
                <div className={'text-sm text-gray-500'}>{tab === 'timeline' ? "" : searchResult.date}</div>
            </div>
        </Link>
    )
}
export default SearchContent