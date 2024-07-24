import React from 'react';
import {useDispatch} from "react-redux";
import {updateIsEdit} from "@/store/slices/appearanceSlice";

const SaveButton = () => {
    const dispatch = useDispatch()

    const handleSave = () => {
        dispatch(updateIsEdit(false))
        return
    }

    return (
        <button onClick={handleSave} className={`px-3 w-fit h-[36px] flex items-center justify-center gap-1.5 border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveButton;
