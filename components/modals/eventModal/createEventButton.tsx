import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEvent, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectTimelineType, updateEventContentType} from "@/store/slices/appearanceSlice";

const CreateEventButton = () => {
    const dispatch = useDispatch();
    const timelineType = useSelector(selectTimelineType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft);

    const handleClick = () => {
        // send currentEventDraft to db and get id
        // get event and update currentEvent & currentEvents
        dispatch(updateCurrentEvent(currentEventDraft));
        dispatch(updateCurrentEvents([...currentEvents, currentEventDraft]))
        if (timelineType !== 'new') dispatch(updateEventContentType('view'))
    }

    return (
        <button onClick={handleClick} className={`px-3 h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Create</div>
        </button>
    );
};

export default CreateEventButton;
