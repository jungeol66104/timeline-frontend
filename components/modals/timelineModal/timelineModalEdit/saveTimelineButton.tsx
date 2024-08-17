import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventsDraft, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {updateInformationContentType} from "@/store/slices/appearanceSlice";

const SaveTimelineButton = () => {
    const dispatch = useDispatch()
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)

    const handleSave = () => {
        dispatch(updateCurrentEvents(currentEventsDraft))
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

export default SaveTimelineButton;
