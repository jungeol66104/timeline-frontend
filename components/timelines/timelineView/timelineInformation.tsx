import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateModalType} from "@/store/slices/appearanceSlice";
import InformationContentImage from "@/components/images/informationContentImage";
import {getBody} from "@/utils/global";
import TimelineMenubar from "@/components/timelines/timelineHeader/timelineMenubar";

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
            <div className={'py-3 px-4'}>
                <InformationContentImage timeline={currentTimeline}/>
                <div className={'h-[120px]'}>
                    <p className={`text-sm line-clamp-5`}>{currentTimeline.content}</p>
                    <button onClick={handleClick} className={'text-sm text-blue-700 hover:underline'}>Show more</button>
                </div>
            </div>
        </div>
    )
}
export default TimelineInformation
