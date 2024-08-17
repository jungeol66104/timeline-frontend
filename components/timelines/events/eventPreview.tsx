import React from 'react';
import {TimelineEvent, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";
import api from "@/pages/api/api";
import {selectDemoKeyConcept, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import {getIsBaseImage} from "@/utils/global";
import EventPreviewImage from "@/components/timelines/events/eventPreviewImage";

const EventPreview = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch();
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    const isBaseImage = getIsBaseImage(event.image)

    const handleClick = async () => {
        try {
            const response = await api.get(`/event/${Number(event.id)}`, {headers: {lang: 'en'}})
            let currentEvent = timelineType === 'demo' ? event : response.data.data
            dispatch(updateCurrentEvent(currentEvent))
            dispatch(updateCurrentEventDraft(currentEvent))
            dispatch(updateModalType('event'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    return (
        <div className={'relative flex gap-2'}>
            {/* node */}
            <div className='z-10 w-3 h-3 bg-white border-2 border-gray-600 rounded-full shrink-0'></div>

            {/* preview */}
            <div onClick={handleClick} className={`cursor-pointer p-2.5 w-full flex flex-col hover:bg-gray-100 border-[1px] border-gray-300 shadow-sm rounded-xl ${timelineType === 'demo' && demoKeyConcept === 'event' && 'outline outline-2 outline-blue-700'}`}>
                <div className={'text-xs font-semibold text-gray-600 line-clamp-1'}>{event.date}</div>
                <div className={'text-md font-bold'}>{event.name}</div>
                <div className={'mt-1 flex justify-between gap-1'}>
                    {!isBaseImage && <EventPreviewImage event={event}/>}
                    <div className={`text-sm whitespace-pre-wrap break-words ${isBaseImage ? 'line-clamp-3' : 'line-clamp-4'}`}>{event.description}</div>
                </div>
            </div>
        </div>
    );
};

export default EventPreview;
