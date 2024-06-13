import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateModalType} from "@/store/slices/appearanceSlice";
import InformationContentImage from "@/components/images/informationContentImage";
import {getBody} from "@/utils/global";
import TimelineMenubar from "@/components/timelines/timelineInformation/timelineMenubar";

const TimelineInformation = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)

    const handleClick = async () => {
        try {
            const body = getBody()
            if (!body) return

            dispatch(updateModalType('information'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    return (
        <div className={`timelineInformation`}>
            <div>
                <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                <div className={'text-md'}>{currentTimeline.description}</div>
                <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
            </div>
            <TimelineMenubar/>
            <hr/>
            <div className={'my-3'}>
                <InformationContentImage timeline={currentTimeline}/>
                <div className={'h-[120px]'}>
                    <p className={`text-sm line-clamp-5`}>{currentTimeline.content}</p>
                    <button onClick={handleClick} className={'text-sm text-blue-700 hover:underline'}>Show more</button>
                </div>
            </div>
            <hr/>
        </div>
    )
}
export default TimelineInformation