import React from 'react';
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const CreateTimelineButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('create'))} className={`px-3 max-[852px]:px-2 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
    );
};

export default CreateTimelineButton;
