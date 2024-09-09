import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const CreateTimelineButton = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEvents = useSelector(selectCurrentEvents)

    return (
        // <button onClick={() => dispatch(updatePopupType('create'))} className={`px-3 max-[852px]:px-2 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
        <button onClick={() => console.log(currentTimelineDraft, currentEvents)} className={`px-3 max-[852px]:px-2 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
    );
};

export default CreateTimelineButton;
