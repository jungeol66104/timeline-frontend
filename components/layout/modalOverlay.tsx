import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, updateEventContentType, updateEventHistoryType, updateModalType, selectTimelineType} from "@/store/slices/appearanceSlice";

const ModalOverlay = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const overlay = modalType !== 'none' && timelineType !== 'demo'

    const handleClick = () => {
        if (modalType !== 'none') {
            dispatch(updateModalType('none'))
            dispatch(updateEventContentType('view'))
            dispatch(updateEventHistoryType('list'))
        }
    }

    return (
        <div onClick={handleClick} className={`${overlay ? 'opacity-30' : 'pointer-events-none opacity-0'} absolute w-full h-full top-0 bg-black`} style={{zIndex: 5001, transition: 'opacity 0.3s'}}></div>
    )
}

export default ModalOverlay
