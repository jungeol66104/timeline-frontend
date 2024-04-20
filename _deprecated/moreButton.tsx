import React from 'react';
import Link from "next/link";
import {Series} from "@/store/slices/contentsSlice";

const MoreButton = ({series} : {series: Series}) => {
    const href = series.id === 3 ? '/series/recent' : `/series/${series.id}`

    return (
        <Link href={href} className={'px-3 max-[525px]:px-2 max-[525px]:text-xs flex items-center justify-center rounded-3xl border-[1px] border-gray-200 bg-white hover:bg-gray-100 text-sm font-semibold'}>
            <span>More</span>
        </Link>
    );
};
export default MoreButton;