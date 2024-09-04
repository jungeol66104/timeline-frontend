import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectIsKeynote, selectTimelineType, updateIsKeynote} from "@/store/slices/appearanceSlice";

const KeynoteToggle = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept);
    const isKeynote = useSelector(selectIsKeynote)

    return (
        <button onClick={() => dispatch(updateIsKeynote(!isKeynote))} className={`px-3 flex items-center justify-center gap-1.5 h-[36px] rounded-md ${isKeynote && 'text-blue-700'} ${timelineType === 'demo' && demoKeyConcept === 'keynote' && 'outline outline-2 outline-blue-700'}`}>
            <div className={`text-sm font-semibold`}>Keynote</div>
            {<div className={`${isKeynote ? 'material-symbols-filled' : 'material-symbols-outlined'} text-[20px]`}>&#xe86c;</div>}
        </button>
    );
};

export default KeynoteToggle;
