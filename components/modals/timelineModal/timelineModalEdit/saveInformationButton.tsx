import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimelineDraft, updateCurrentTimeline} from "@/store/slices/contentsSlice";
import {updateInformationContentType} from "@/store/slices/appearanceSlice";

const SaveInformationButton = () => {
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft);

    const handleSave = () => {
        dispatch(updateCurrentTimeline(currentTimelineDraft))
        // send to db
        // if timelineContentType new, route to '/@user/timelines/id'
        // else route to '/timelines/id'
        dispatch(updateInformationContentType('view'))
        return
    }

    return (
        <button onClick={handleSave} className={`px-3 h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveInformationButton;
