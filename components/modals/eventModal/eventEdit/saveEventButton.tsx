import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateEventContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, updateCurrentEvent, updateCurrentEventDraft, updateEventInCurrentEvents, updateEventInCurrentEventsDraft} from "@/store/slices/contentsSlice";

const SaveEventButton = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleSave = () => {
        dispatch(updateCurrentEvent(currentEventDraft))
        dispatch(updateCurrentEventDraft(currentEventDraft))
        dispatch(updateEventInCurrentEvents(currentEventDraft))
        dispatch(updateEventInCurrentEventsDraft(currentEventDraft))
        // also save to db
        dispatch(updateEventContentType('view'))
        return
    }

    return (
        <button onClick={handleSave} className={`h-[36px] px-3 flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveEventButton;
