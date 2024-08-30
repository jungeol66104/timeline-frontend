import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateEventContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEvent, updateCurrentEvents, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";

const SaveEventButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleSave = () => {
        dispatch(updateCurrentEvent(currentEventDraft));
        let events = currentEvents.filter((event) => event.id !== currentEventDraft.id)
        events = [...events, currentEventDraft]
        events.sort((a, b) => Number(a.ephemerisTime) - Number(b.ephemerisTime))
        dispatch(updateCurrentEvents(events))
        // also save to db
        if (timelineType !== 'new') dispatch(updateEventContentType('view'))
        return
    }

    return (
        <button onClick={handleSave} className={`h-[36px] px-3 flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveEventButton;
