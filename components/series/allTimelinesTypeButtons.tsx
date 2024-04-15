import React, {useEffect} from 'react';
import {selectAllTimelinesType, updateAllTimelinesType} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import {TimelineEvent, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import api from "@/utils/api";
import Link from "next/link";

const AllTimelinesTypeButtons = () => {
    const allTimelinesType = useSelector(selectAllTimelinesType)

    return (
        <div className={'flex gap-2.5 w-full'}>
            <Link href={'/series/recent'} className={`typeButton recent flex justify-center items-center h-8 px-3 border-[1px] ${allTimelinesType === 'recent' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} text-sm rounded-3xl font-semibold max-[525px]:h-6 max-[525px]:px-2 max-[525px]:text-xs`}><span>Recently Added</span></Link>
            <Link href={'/series/popular'} className={`typeButton popular flex justify-center items-center h-8 px-3 border-[1px] ${allTimelinesType === 'popular' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} text-sm rounded-3xl font-semibold max-[525px]:h-6 max-[525px]:px-2 max-[525px]:text-xs`}><span>Popular</span></Link>
        </div>
    );
};

export default AllTimelinesTypeButtons;
