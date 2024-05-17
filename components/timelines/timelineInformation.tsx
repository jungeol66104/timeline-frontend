import React from 'react'
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Link from "next/link";
import InformationContentImage from "@/components/images/informationContentImage";

const TimelineInformation = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={`timelineInformation`}>
            <div>
                <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                <div className={'text-md text-gray-500'}>{currentTimeline.description}</div>
            </div>
            <div className={'mt-2.5 mb-3'}>
                <InformationContentImage timeline={currentTimeline}/>
                <div className={'h-[120px]'}>
                    <p className={`text-sm line-clamp-5`}>{currentTimeline.content}</p>
                    <Link className={'text-sm text-blue-700 hover:underline'} href={`/information/${currentTimeline.id}`}>Show more</Link>
                </div>
            </div>
            <hr/>
        </div>
    )
}
export default TimelineInformation
