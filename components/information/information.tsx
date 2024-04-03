import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import TimelineImage from "@/components/timelineImage";
import TimelineListRelated from "@/components/timeline/timelineListRelated";

const Information = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'h-full w-full max-w-[600px] p-4'}>
            <div className={'flex flex-col gap-2.5'}>
                <div className={'relative flex flex-col items-center gap-4'}>
                    <TimelineImage timeline={currentTimeline} size={190}/>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={'text-2xl font-bold text-center'}>{currentTimeline.name}</h1>
                        <div className={'text-md text-gray-500 text-center'}>{currentTimeline.description}</div>
                        <div className={'mt-2 text-gray-500 font-medium text-sm'}>
                            <span>by Timeline · January 14, 2024</span>
                        </div>
                    </div>
                </div>
                <div className={''}>
                    <p className={`text-md`}>
                        Muhammad bin Salman, born in 1985, is a prominent Saudi Arabian royal and politician,
                        known for his ambitious reform agenda and his role as Crown Prince since 2017.
                        <br/><br/>He has spearheaded the Vision 2030 program aimed at diversifying the Saudi
                        economy and modernizing society.
                        <br/><br/>While praised for his efforts, he has also faced criticism for alleged human
                        rights abuses and his involvement in controversial incidents, such as the murder of
                        journalist Jamal Khashoggi in 2018.
                        <br/><br/>Nonetheless, he remains a significant figure both domestically and
                        internationally, shaping Saudi Arabia&apos;s future trajectory and its relations with
                        the global community.
                    </p>
                </div>
            </div>
            <TimelineListRelated/>
        </div>
    );
};

export default Information;
