import React from 'react';
import {useDispatch} from "react-redux";

const SaveTimelineButton = () => {
    const dispatch = useDispatch()

    const handleSave = () => {


        return
    }

    return (
        <button onClick={handleSave} className={`px-3 h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveTimelineButton;
