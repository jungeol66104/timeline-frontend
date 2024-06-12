import React from 'react';
import {useDispatch} from "react-redux";
import {updateContentType} from "@/store/slices/appearanceSlice";

const SaveButton = () => {
    const dispatch = useDispatch()

    const handleSave = () => {
        dispatch(updateContentType('view'))
        return
    }

    return (
        <button onClick={handleSave} className={`px-3 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveButton;
