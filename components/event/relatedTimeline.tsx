import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import Image from "next/image";
import {temporarySeries} from "@/utils/global";

const RelatedTimeline = () => {
    const currentEvent = useSelector(selectCurrentEvent)


    return (
        <div className={'flex flex-col gap-2.5'}>
            <h2 className={'text-lg font-semibold'}>연관된 타임라인</h2>
            {currentEvent.timelineInfo?.map((tI, i) => {
                    return (<Link key={i} href={`/timelines/${tI.id}`} className={'h-[65px] w-[230px] bg-white shadow-md rounded-lg border-[1px] flex gap-2.5 items-center px-2.5'}>
                                <div className={'shrink-0'}><Image src={`/images/timeline/${tI.id}.png`} alt={tI.name} width={45} height={45} className={'rounded-md'}/></div>
                                <div>
                                    <div className={'font-semibold text-md line-clamp-1'}>{tI.name}</div>
                                    <div className={'text-sm line-clamp-1 opacity-90'}>{(temporarySeries[2]["timelines"] as any[]).find(timeline => timeline.id === tI.id).description}</div>
                                </div>
                            </Link>)
                })
            }
        </div>
    );
};

export default RelatedTimeline;
