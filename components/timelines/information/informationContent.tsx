import React from 'react';
import InformationContentImage from "@/components/timelines/information/informationContentImage";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const InformationContent = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'mt-2.5'}>
            <InformationContentImage timeline={currentTimeline}/>
            <div className={'h-[120px]'}>
                <p className={`text-sm line-clamp-5`}>{currentTimeline.content}</p>
                <Link className={'text-sm text-blue-700 hover:underline'} href={`/information/${currentTimeline.id}`}>Show more</Link>
            </div>
        </div>
    )
}

export default InformationContent;
