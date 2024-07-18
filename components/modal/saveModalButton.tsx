import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateModalContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEvent, updateCurrentTimeline, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";

const SaveModalButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleSave = () => {
        if (modalType === 'information') dispatch(updateCurrentTimeline(currentTimelineDraft))
        else if (modalType === 'event') {
            dispatch(updateCurrentEvent(currentEventDraft))
            dispatch(updateEventInCurrentEvents(currentEventDraft))
        }
        // also save to db

        dispatch(updateModalContentType('view'))
        return
    }

    return (
        <button onClick={handleSave} className={`h-[36px] px-3 flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveModalButton;
