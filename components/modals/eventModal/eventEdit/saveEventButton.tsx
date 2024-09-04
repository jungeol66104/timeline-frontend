import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectErrorType, selectTimelineType, updateEventContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEvent, updateCurrentEvents} from "@/store/slices/contentsSlice";

const SaveEventButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const errorType = useSelector(selectErrorType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleSave = () => {
        if (errorType === 'date') {
            dispatch(updatePopupType('dateError'))
            return
        }

        if (timelineType === 'private' || timelineType === 'public') {
            const body = {
                "isPrivate": timelineType === 'private' ? 1 : 0,
                "eventId": currentEventDraft.id,
                "revisionNo": 1, // should fix store
                "date": currentEventDraft.date,
                "ephemerisTime": currentEventDraft.ephemerisTime,
                "title": currentEventDraft.title,
                "content": currentEventDraft.content,
                "imagePath": currentEventDraft.imagePath,
                "isKeynote": currentEventDraft.isKeynote,
                "note": "",
            }

            try {
                // const response = await axios.put('/api/wiki/event/update-event', body);
            } catch (error) {
                console.error('Error creating event: ', error)
                return
            }
        }

        let events = currentEvents.filter((event) => event.id !== currentEventDraft.id)
        events = [...events, currentEventDraft]
        events.sort((a, b) => Number(a.ephemerisTime) - Number(b.ephemerisTime))
        dispatch(updateCurrentEvent(currentEventDraft));
        dispatch(updateCurrentEvents(events))
        if (timelineType !== 'new') dispatch(updateEventContentType('view'))
    }

    return (
        <button onClick={handleSave} className={`h-[36px] px-3 flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveEventButton;
