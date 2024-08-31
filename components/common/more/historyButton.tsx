import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateEventContentType, updateModalType, updateInformationContentType} from "@/store/slices/appearanceSlice";

const HistoryButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)

    const handleClick = () => {
        if (modalType === 'none') dispatch(updateInformationContentType('history'))
        else if (modalType === 'event') dispatch(updateEventContentType('history'))
        else if (modalType === 'information') {
            dispatch(updateModalType('none'))
            dispatch(updateInformationContentType('history'))
        }
    }

    return (
        <button onClick={handleClick} className={`w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe889;</div>
            <div className={'text-sm font-semibold'}>History</div>
        </button>
    );
};

export default HistoryButton;
