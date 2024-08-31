import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent, selectCurrentTimeline, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectModalType} from "@/store/slices/appearanceSlice";

const ResetEditButton = () => {
    const dispatch = useDispatch();
    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline);
    const currentEvent = useSelector(selectCurrentEvent);

    const handleClick = () => {
        if (modalType === 'event') {
            dispatch(updateCurrentEventDraft(currentEvent));
        } else {
            dispatch(updateCurrentTimelineDraft(currentTimeline))
        }
    }

    return (
        <button onClick={handleClick} className={'material-symbols-outlined text-[20px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe5d5;</button>
    );
};

export default ResetEditButton;
