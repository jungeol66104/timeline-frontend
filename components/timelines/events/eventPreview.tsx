import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import api from "@/pages/api/api";
import {getIsBaseImage} from "@/utils/global";
import {selectDemoKeyConcept, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
import {Event, selectCurrentTimeline, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import EventPreviewImage from "@/components/timelines/events/eventPreviewImage";
import axios from "axios";

const EventPreview = ({event} : {event: Event}) => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentTimeline = useSelector(selectCurrentTimeline)

    const isBaseImage = getIsBaseImage(event.imagePath)

    const handleClick = async () => {
        try {
            let newEvent: any;
            if (timelineType === 'new' || timelineType === 'demo') newEvent = {...event}
            else if (timelineType === 'private') {
                const response = await axios.get(`/api/user/event/fetch?timelineId=${currentTimeline.id}&eventId=${event.id}`)
                newEvent = response.data
            } else if (timelineType === 'public') {
                const response = await api.get(`/event/${Number(event.id)}`, {headers: {lang: 'en'}})
                newEvent = response.data.data
            }

            const image = new Image();
            image.src = newEvent.cdnUrl + newEvent.imagePath;

            image.onload = () => {
                newEvent.imageSize = {width: image.width, height: image.height}
                dispatch(updateCurrentEvent(newEvent))
                dispatch(updateCurrentEventDraft(newEvent))
                dispatch(updateModalType('event'))
            };
        } catch (error) {console.error('Error fetching event: ', error)}
    }

    return (
        <div className={'relative flex gap-2'}>
            <div className='z-10 w-3 h-3 bg-white border-2 border-gray-600 rounded-full shrink-0'></div>
            <div onClick={handleClick} className={`cursor-pointer p-2.5 w-[calc(100%-20px)] flex flex-col hover:bg-gray-100 border-[1px] border-gray-300 shadow-sm rounded-xl ${timelineType === 'demo' && demoKeyConcept === 'event' && 'outline outline-2 outline-blue-700'}`}>
                <div className={'text-xs font-semibold text-gray-600 line-clamp-1'}>{event.date}</div>
                <div className={'text-md font-bold break-words'}>{event.title}</div>
                <div>
                    {!isBaseImage && <EventPreviewImage event={event}/>}
                    <div className={`text-sm whitespace-pre-wrap break-words ${isBaseImage ? 'line-clamp-3' : 'line-clamp-4'}`}>{event.content}</div>
                </div>
            </div>
        </div>
    );
};

export default EventPreview;
