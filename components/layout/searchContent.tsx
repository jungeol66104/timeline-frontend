import {TimelineEvent} from "@/store/slices/contentsSlice";
import Link from "next/link";
import Image from "next/image";
import NorthwestSVG from "@/public/svg/northwest.svg";
import React from "react";
import {useSelector} from "react-redux";
import {selectTab} from "@/store/slices/searchSlice";
// refactoring: clear

const SearchContent = ({searchResult}: {searchResult: any}) => {
    const tab = useSelector(selectTab)

    return (
        <Link href={ tab === 'timeline' ? `/timelines/${searchResult.id}` : `/events/${searchResult.id}`}>
            <div className={'flex items-center pt-[6px] pb-[6px] gap-2.5'}>
                {tab === 'timeline' && <div className={'searchImage w-[28px] h-[28px] relative'}><Image className={'rounded-sm'} src={`/images/timeline/${searchResult.id}.png`} alt={`${searchResult.name}`} width={28} height={28} /></div>}
                <div className={'font-medium flex-1 line-clamp-1'} >{searchResult.name}</div>
                <div className={'text-sm text-gray-500'}>{tab === 'timeline' ? "" : searchResult.date}</div>
            </div>
        </Link>
    )
}
export default SearchContent