import React from 'react';
import {useDispatch} from "react-redux";
import {updateIsTimelineEdit} from "@/store/slices/appearanceSlice";

const CompleteButton = () => {
    const dispatch = useDispatch()

    const handleComplete = () => {
        dispatch(updateIsTimelineEdit(false))
        return
    }

    return (
        <button onClick={handleComplete} className={`px-3 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Complete</div>
        </button>
    )
};

export default CompleteButton;
