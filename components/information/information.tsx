import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import TimelineImage from "@/components/timelineImage";
import TimelineListRelated from "@/components/timeline/timelineListRelated";

const Information = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'h-full w-full max-w-[600px] p-4'}>
            <div className={'flex flex-col'}>
                <div className={'relative flex flex-col items-center gap-4'}>
                    <TimelineImage timeline={currentTimeline} size={190}/>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={'text-2xl font-bold text-center'}>{currentTimeline.name}</h1>
                        <div className={'text-md text-gray-500 text-center'}>{currentTimeline.description}</div>
                        <div className={'my-1 text-gray-500 font-medium text-sm'}><span>by Timeline · January 14, 2024</span></div>
                    </div>
                </div>
                <div className={'mt-[6px]'}>
                    <p className={`text-md`}>
                        Muhammad Ali, born Cassius Marcellus Clay Jr., was a legendary heavyweight boxer and activist. Renowned for his boxing skills and charismatic personality, he won numerous titles and awards. Ali&apos;s refusal to be drafted into the military during the Vietnam War and his advocacy for civil rights made him an iconic figure in history.
                    </p>
                </div>
            </div>
            <TimelineListRelated/>
        </div>
    );
};

export default Information;
