import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateCurrentEventDraft} from "@/store/slices/contentsSlice";

const KeynoteButton = () => {
    const dispatch = useDispatch();
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = () => {
        dispatch(updateCurrentEventDraft({...currentEventDraft, keynote: !currentEventDraft.keynote}))
    }

    return (
        <button onClick={handleClick} className={`flex items-center justify-center gap-1.5 h-[36px] rounded-md ${currentEventDraft.keynote && 'text-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${currentEventDraft.keynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteButton;
