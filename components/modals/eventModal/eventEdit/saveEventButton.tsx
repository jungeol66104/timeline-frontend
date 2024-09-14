import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectErrorType, selectTimelineType, updateEventContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvent, selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, updateCurrentEvent, updateCurrentEvents} from "@/store/slices/contentsSlice";

import axios from "axios";

const SaveEventButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const errorType = useSelector(selectErrorType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEvent = useSelector(selectCurrentEvent)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = async () => {
        if (errorType === 'date' || currentEventDraft.date === '') {
            dispatch(updatePopupType('dateError'))
            return
        } else if (currentEventDraft.title === '') {
            dispatch(updatePopupType('titleError'))
            return
        }

        if (timelineType === 'private' || timelineType === 'public') {
            const updateBody = {
                "isPrivate": timelineType === 'public' ? 0 : 1,
                "timelineId": currentTimeline.id,
                "eventId": currentEventDraft.id,
                "revisionNo": currentEventDraft.revisionNo,
                "date": currentEventDraft.date,
                "ephemerisTime": currentEventDraft.ephemerisTime,
                "title": currentEventDraft.title,
                "content": currentEventDraft.content,
                "imagePath": currentEventDraft.imagePath,
                "note": "",
            }
            const keynoteBody = {
                "isPrivate": timelineType === 'public' ? 0 : 1,
                "eventId": currentEventDraft.id,
                "timelineId": currentTimeline.id,
                "isKeynote": currentEventDraft.isKeynote,
                "note": ""
            }

            try {
                const updateResponse = await axios.put('/api/wiki/event/update', updateBody);
                let keynoteResponse;
                if (currentEventDraft.isKeynote === currentEvent.isKeynote) keynoteResponse = {status: 200, data: {code: 200}}
                else keynoteResponse = await axios.put('/api/wiki/keynote', keynoteBody)
                if (updateResponse.status === 200 || keynoteResponse.status === 200) {
                    console.log(keynoteBody)
                    console.log(keynoteResponse.data)
                    if (updateResponse.data.code === 69999 || keynoteResponse.data.code === 69999) return
                    let events = currentEvents.filter((event) => event.id !== currentEventDraft.id)
                    events = [...events, currentEventDraft]
                    events.sort((a, b) => Number(a.ephemerisTime) - Number(b.ephemerisTime))
                    dispatch(updateCurrentEvent(currentEventDraft));
                    dispatch(updateCurrentEvents(events))
                    dispatch(updateEventContentType('view'))
                }
            } catch (error) {console.error('Error creating event: ', error)}
        } else {
            let events = currentEvents.filter((event) => event.id !== currentEventDraft.id)
            events = [...events, currentEventDraft]
            events.sort((a, b) => Number(a.ephemerisTime) - Number(b.ephemerisTime))
            dispatch(updateCurrentEvent(currentEventDraft));
            dispatch(updateCurrentEvents(events))
            if (timelineType !== 'new') dispatch(updateEventContentType('view'))
        }
    }

    return (
        <button onClick={handleClick} className={`h-[36px] px-3 flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveEventButton;
