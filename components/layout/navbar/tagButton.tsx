import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectTagNum} from "@/store/slices/appearanceSlice";
import {getCurrentTag} from "@/utils/global";

const TagButton = ({tagNum}: {tagNum: number}) => {
    const currentTagNum = useSelector(selectTagNum)
    const currentTag = getCurrentTag(tagNum)
    const tagAppearance = currentTag === 'Hot' ? <span>&#x1F525;  Hot</span> : currentTag === 'Staff Picks' ? <span>&#x2728;  Staff Picks</span> : currentTag === 'Popular' ? <span><span className={'text-[12px]'}>🏆</span>  Popular</span> : <span>{currentTag}</span>;

    // const hiddenTagNums = [5, 7, 11, 12, 13]
    const hiddenTagNums = [13]

    return (
        <>
            {!hiddenTagNums.includes(tagNum) && <Link href={`/?tagNum=${tagNum}`} className={`h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTagNum === tagNum ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}>{tagAppearance}</Link>}
        </>
    );
};

export default TagButton;
