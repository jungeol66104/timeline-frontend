import React, {useLayoutEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import InformationContent from "@/components/timeline/informationContent";

const TimelineInformation = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'timelineInformation mb-3'}>
            <h1 className={'text-2xl font-bold'}>{currentTimeline.name}</h1>
            <div className={'text-md text-gray-500'}>{currentTimeline.description}</div>
            <InformationContent />
        </div>
    )
}
export default TimelineInformation
