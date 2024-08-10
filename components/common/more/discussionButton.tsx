import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateModalContentType, updateTimelineContentType} from "@/store/slices/appearanceSlice";

const DiscussionButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)

    const handleClick = () => {
        if (modalType === 'none') dispatch(updateTimelineContentType('discussion'))
        else if (modalType === 'event') dispatch(updateModalContentType('discussion'))
    }

    return (
        <button onClick={handleClick} className={`w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe0bf;</div>
            <div className={'text-sm font-semibold'}>Discussion</div>
        </button>
    );
};

export default DiscussionButton;
