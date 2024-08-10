import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent, selectCurrentEvents, selectCurrentTimeline, updateCurrentEventDraft, updateCurrentEventsDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectModalType} from "@/store/slices/appearanceSlice";

const ResetEditButton = () => {
    const dispatch = useDispatch();
    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline);
    const currentEvents = useSelector(selectCurrentEvents);
    const currentEvent = useSelector(selectCurrentEvent);

    const handleClick = () => {
        if (modalType === 'event') {
            dispatch(updateCurrentEventDraft(currentEvent));
        } else {
            dispatch(updateCurrentTimelineDraft(currentTimeline))
            dispatch(updateCurrentEventsDraft(currentEvents))
        }
    }

    return (
        <button onClick={handleClick} className={`px-3 max-[852px]:px-2 h-[36px] text-sm font-semibold bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 rounded-md drop-shadow-sm `}>
            Reset
        </button>
    );
};

export default ResetEditButton;
