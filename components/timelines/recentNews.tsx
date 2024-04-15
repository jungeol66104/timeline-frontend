import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";
import {getDateToday} from "@/utils/global";

const RecentNews = () => {
    const recentNews = [
        {id: 0, source: 'The Guardian', title: 'Middle East crisis live: UN secretary general calls for de-escalation after Iran attack on Israel', author: 'Reged Ahmad', publishedAt: '2024-04-15'},
        {id: 1, source: 'The Guardian', title: 'Lebanese man under US sanctions for allegedly funding Hamas found dead', author: 'Joshua Leifer', publishedAt: '2024-04-10'},
        {id: 2, source: 'The Guardian', title: 'Gaza ceasefire hopes rise after Hamas abandons key demands', author: 'Jason Burke', publishedAt: '2024-03-16'},
    ]
    const isTopEnd = useSelector(selectIsTopEnd)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = () => {
        setIsToggle(!isToggle)
    }

    return (
        <div className={`flex flex-col ${!isTopEnd && 'hidden'}`}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-[20px] py-3 font-bold'}>Recent News</h3>
                <button onClick={handleClick} className={`flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white hover:bg-gray-100`}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} className={`opacity-80 ${isToggle ? 'rotate-90' : '-rotate-90'}`}/></button>
            </div>
            {recentNews.map((article, i) => {
                const isToday = getDateToday() === article.publishedAt

                return (
                    <Link key={article.id} href={'/'} className={`px-3 py-2 mb-3 border-[1px] ${isToday ? 'border-red-300' : 'border-gray-300'} rounded-lg hover:bg-gray-100 ${!isToggle && i !== 0 && 'hidden'}`}>
                        <div className={`flex gap-1 items-center ${!isToday && 'hidden'}`}>
                            <span className={'font-semibold text-sm text-red-700'}>Today</span>
                            <div className={'h-1.5 w-1.5 rounded-full bg-red-700'}></div>
                        </div>
                        <div className={'font-medium min-h-[48px]'}>{article.title}</div>
                        <div className={'mt-1 flex gap-1 text-xs text-gray-500'}><span className={'font-medium'}>{article.publishedAt}</span>·<span>{article.source}</span>·<span>{article.author}</span></div>
                    </Link>
                )})
            }
            <hr/>
        </div>
    );
};

export default RecentNews;
