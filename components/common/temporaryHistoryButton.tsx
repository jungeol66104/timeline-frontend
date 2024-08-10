import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalContentType, selectModalType, selectTimelineContentType, updateModalContentType, updateModalType, updateTimelineContentType} from "@/store/slices/appearanceSlice";

const TemporaryHistoryButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const timelineContentType = useSelector(selectTimelineContentType)
    const modalContentType = useSelector(selectModalContentType)
    const contentType = modalType === 'event' ? modalContentType : timelineContentType

    const handleClick = () => {
        if (modalType === 'none') dispatch(updateTimelineContentType('history'))
        else if (modalType === 'event') dispatch(updateModalContentType('history'))
        else if (modalType === 'information') {
            dispatch(updateModalType('none'))
            dispatch(updateTimelineContentType('history'))
        }
    }

    return (
        <div className={'w-[36px] h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>
            <button onClick={handleClick} className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md ${contentType === 'history' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white drop-shadow-sm' : 'hover:bg-gray-100'}`}>&#xe889;</button>
        </div>
    );
};

export default TemporaryHistoryButton;