import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";

const RecentNews = () => {
    const recentNews = [{id: 0, source: 'The Guardian', title: 'Middle East crisis live: UN secretary general calls for de-escalation after Iran attack on Israel', description: 'United Nations Secretary-General António Guterres has called on members not to further escalate tensions with reprisals against Iran.', author: 'Reged Ahmad', publishedAt: '2024-04-15'}]
    const isTopEnd = useSelector(selectIsTopEnd)

    return (
        <div className={`flex flex-col ${!isTopEnd && 'hidden'}`}>
            <div className={'flex items-center gap-2.5'}>
                <h3 className={'text-[20px] py-3 font-bold'}>Recent News</h3>
                {/*<div className={'text-md text-red-700 font-semibold'}>Today</div>*/}
            </div>
            {/* py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>{relatedTimeline.name}</Link>*/}
            <Link href={'/'} className={'px-3 py-2 mb-3 border-[1px] border-red-300 rounded-lg hover:bg-gray-100'}>
                {/*<div className={'text-sm font-medium text-gray-500'}>{recentNews[0].source}</div>*/}
                <div className={'flex gap-1 items-center text-sm text-red-700'}>
                    <span>Today</span>
                    <div className={'h-1.5 w-1.5 rounded-full bg-red-700'}></div>
                </div>
                <div className={'font-medium'}>{recentNews[0].title}</div>
                <div className={'flex gap-1 text-sm text-gray-500'}><span>{recentNews[0].publishedAt}</span>·<span>{recentNews[0].source}</span>·<span>{recentNews[0].author}</span></div>
                {/*<div className={'flex gap-1 text-sm text-gray-500'}><span>Today</span>·<span>{recentNews[0].source}</span>·<span>{recentNews[0].author}</span></div>*/}
            </Link>
            <hr/>
        </div>
    );
};

export default RecentNews;
