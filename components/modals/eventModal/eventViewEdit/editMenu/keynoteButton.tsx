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
        <button onClick={handleClick} className={`shrink-0 pl-2.5 pr-1.5 w-[100px] h-9 flex items-center justify-center gap-1.5 bg-white hover:bg-gray-100 rounded-md border-[0.1px] border-gray-300 ${currentEventDraft.isKeynote && 'text-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${currentEventDraft.isKeynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteButton;
