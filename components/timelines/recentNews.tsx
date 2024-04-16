import React, {useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline, selectRelatedNews} from "@/store/slices/contentsSlice";
import {formatArticleDate} from "@/utils/global";

const RecentNews = () => {
    let currentTimeline = useSelector(selectCurrentTimeline)
    let recentNews = useSelector(selectRelatedNews)
    recentNews = recentNews.filter(article => article.title.includes(currentTimeline.name)).slice(0,10)
    const isTopEnd = useSelector(selectIsTopEnd)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = () => {
        setIsToggle(!isToggle)
    }

    return (
        <div className={`flex flex-col ${(!isTopEnd || recentNews.length <= 0) && 'hidden'}`}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'text-[20px] py-3 font-bold'}>News</h3>
                <button onClick={handleClick} className={`${recentNews.length <= 1 && 'hidden'} flex items-center justify-center w-[30px] h-[30px] rounded-full border-[1px] border-gray-200 bg-white hover:bg-gray-100`}><Image src={'/svg/before.svg'} alt={'before'} height={20} width={20} className={`opacity-80 ${isToggle ? 'rotate-90' : '-rotate-90'}`}/></button>
            </div>
            {recentNews.map((article, i) => {
                const isToday = article.live

                const handleClick = () => {
                    window.open(article.url, '_blank', );
                }

                return (
                    <div key={article.id} onClick={handleClick} className={`cursor-pointer px-3 py-2 mb-3 border-[1px] ${isToday ? 'border-red-300' : 'border-gray-300'} rounded-lg hover:bg-gray-100 ${!isToggle && i !== 0 && 'hidden'}`}>
                        {isToday
                            ?   <div className={`flex gap-1.5 items-center`}><span className={'font-semibold text-sm text-red-700'}>Today</span><div className={'h-1.5 w-1.5 rounded-full bg-red-700'}></div></div>
                            :   <div className={'flex justify-center items-center h-5 w-fit font-semibold text-xs text-gray-500'}><span>{formatArticleDate(article.date)}</span></div>
                        }
                        <div className={'font-medium min-h-[48px]'}>{article.title}</div>
                        <div className={'mt-1 flex gap-1 text-xs text-gray-500'}><span>{article.platform}</span>·<span>{article.author}</span></div>
                    </div>
                )
            })
            }
            <hr/>
        </div>
    );
};

export default RecentNews;
