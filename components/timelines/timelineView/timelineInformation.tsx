import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectTimelineContentType, updateModalType} from "@/store/slices/appearanceSlice";
import TimelineContentImage from "@/components/timelines/timelineView/timelineContentImage";

const TimelineInformation = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'
    const timeline = isTimelineEditable ? currentTimelineDraft : currentTimeline

    const handleClick = async () => {
        try {
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
                <TimelineContentImage src={timeline.image} alt={timeline.name} imageSize={timeline.imageSize}/>
                <div className={'h-[120px]'}>
                    <p className={`text-sm line-clamp-5`}>{timeline.content}</p>
                    <button onClick={handleClick} className={'text-sm text-blue-700 hover:underline'}>Show more</button>
                </div>
            </div>
        </div>
    )
}
export default TimelineInformation
