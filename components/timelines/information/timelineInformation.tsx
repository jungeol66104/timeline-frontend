import React from 'react'
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import InformationContent from "@/components/timelines/information/informationContent";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";

const TimelineInformation = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isTopEnd = useSelector(selectIsTopEnd)

    return (
        <div className={`timelineInformation ${!isTopEnd && 'hidden'}`}>
            <div>
                <h1 className={'text-2xl font-bold'}>{currentTimeline.name}</h1>
                <div className={'text-md text-gray-500'}>{currentTimeline.description}</div>
            </div>
            <InformationContent/>
            <hr/>
        </div>
    )
}
export default TimelineInformation
