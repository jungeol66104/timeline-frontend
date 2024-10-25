import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectEventContentType, selectTimelineType, updateEventContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectIsSession} from "@/store/slices/privateSlice";
import {selectCurrentEvent, updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";

const dev = true

const EventViewEditButton = () => {
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)
    const timelineType = useSelector(selectTimelineType)
    const eventContentType = useSelector(selectEventContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentEvent = useSelector(selectCurrentEvent)

    const handleClick = (contentType: string) => {
        if (contentType === 'edit') {
            if (isSession || timelineType === 'new' || timelineType === 'demo' || dev) {
                const image = new Image();
                image.src = currentEvent.cdnUrl! + currentEvent.imagePath!;
                image.onload = () => {
                    const imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentEvent({...currentEvent, imageSize}))
                    dispatch(updateCurrentEventDraft({...currentEvent, imageSize}))
                    dispatch(updateEventContentType(contentType))
                }
            } else dispatch(updatePopupType('signIn'))
        } else {
            const image = new Image();
            image.src = currentEvent.cdnUrl! + currentEvent.imagePath!;
            image.onload = () => {
                const imageSize = {width: image.width, height: image.height}
                dispatch(updateCurrentEvent({...currentEvent, imageSize}))
                dispatch(updateCurrentEventDraft({...currentEvent, imageSize}))
                dispatch(updateEventContentType(contentType))
            }
        }
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'}`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${eventContentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${eventContentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
        </div>
    );
};

export default EventViewEditButton;
