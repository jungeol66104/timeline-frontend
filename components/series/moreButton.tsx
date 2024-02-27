import React from 'react';
import Link from "next/link";

const MoreButton = ({series} : {series: Series}) => {
    return (
        <Link href={`/series/${series.id}`} className={'px-3 max-[525px]:px-1.5 max-[525px]:text-xs flex items-center justify-center rounded-3xl border-[1px] border-gray-200 bg-white hover:bg-gray-100 text-sm font-semibold'}>
            <span>More</span>
        </Link>
    );
};

export default MoreButton;

interface Series {
    id: number
    name: string
    description: string
    timelines: SeriesTimeline[]
    hasMore: boolean
}

interface SeriesTimeline {
    id: number
    name: string
    description: string
    image: string
}