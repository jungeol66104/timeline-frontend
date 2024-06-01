import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import TimelineImage from "@/components/images/timelineImage";
import BackToTimelineButton from "@/_deprecated/information/backToTimelineButton";

const Information = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'relative flex flex-col h-fit w-full max-w-[630px]'}>
            <div className={'h-full flex flex-col justify-between'}>
                <div className={'flex flex-col items-center'}>
                    <div className={'relative flex flex-col items-center gap-4'}>
                        <TimelineImage timeline={currentTimeline} size={190}/>
                        <div className={'flex flex-col items-center'}>
                            <h1 className={'text-2xl font-bold text-center'}>{currentTimeline.name}</h1>
                            <div className={'text-md text-gray-500 text-center'}>{currentTimeline.description}</div>
                            <div className={'my-1 text-gray-500 font-medium text-sm'}><span>by Timeline · January 14, 2024</span></div>
                        </div>
                    </div>
                    <div className={'mt-[6px] mb-3'}>
                        <p className={`text-md`}>{currentTimeline.content}</p>
                    </div>
                </div>
                {/*<div className={'h-[100px]'}></div>*/}
                {/*<BackToTimelineButton />*/}
                <hr />
            </div>

        </div>
    );
};

export default Information;
