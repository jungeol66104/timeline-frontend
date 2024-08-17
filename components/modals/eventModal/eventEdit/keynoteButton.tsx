import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, updateDraftKeynote} from "@/store/slices/contentsSlice";

const KeynoteButton = () => {
    const dispatch = useDispatch();
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = () => {
        dispatch(updateDraftKeynote(currentEventDraft.id))
    }

    return (
        <button onClick={handleClick} className={`px-3 flex items-center justify-center gap-1.5 h-[36px] hover:bg-gray-100 rounded-md ${currentEventDraft.keynote && 'text-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${currentEventDraft.keynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteButton;
