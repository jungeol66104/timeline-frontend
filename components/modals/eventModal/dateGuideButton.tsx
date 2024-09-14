import React from 'react';
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const DateGuideButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('dateGuide'))} className={'flex items-center gap-1 text-blue-700'}>
            <div className={'material-symbols-outlined text-[12px]'}>&#xe887;</div>
            <span className={'mt-[1px] text-[10px]'}>Guide</span>
        </button>
    );
};

export default DateGuideButton;
