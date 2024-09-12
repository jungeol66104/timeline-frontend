import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import {selectTimelineType} from "@/store/slices/appearanceSlice";

const KeynoteButton = () => {
    const dispatch = useDispatch();
    const timelineType = useSelector(selectTimelineType)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = () => {
        const targetKeynote = currentEventDraft.isKeynote === 0 ? 1 : 0;

        dispatch(updateCurrentEventDraft({...currentEventDraft, isKeynote: targetKeynote}));
        if (timelineType === 'new') dispatch(updateEventInCurrentEvents({...currentEventDraft, isKeynote: targetKeynote}))
    }

    return (
        <button onClick={handleClick} className={`flex items-center justify-center gap-1.5 h-[36px] rounded-md ${currentEventDraft.isKeynote && 'text-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${currentEventDraft.isKeynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteButton;
