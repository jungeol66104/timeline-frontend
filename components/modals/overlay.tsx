import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsShare, selectModalType, updateEventContentType, updateEventHistoryType, updateIsShare, updateModalType, selectTimelineType} from "@/store/slices/appearanceSlice";

const Overlay = () => {
    const dispatch = useDispatch()
    const isShare = useSelector(selectIsShare)
    const timelineType = useSelector(selectTimelineType)
    const timelineModalType = useSelector(selectModalType)
    const overlay = isShare || (timelineModalType !== 'none' && timelineType !== 'demo')

    const handleClick = () => {
        if (isShare) dispatch(updateIsShare())
        else if (timelineModalType !== 'none') {
            dispatch(updateModalType('none'))
            dispatch(updateEventContentType('view'))
            dispatch(updateEventHistoryType('list'))
        }
    }

    return (
        <div onClick={handleClick} className={`${overlay ? 'opacity-30' : 'pointer-events-none opacity-0'} absolute w-full h-full top-0 bg-black`} style={{zIndex: 5001, transition: 'opacity 0.3s'}}></div>
    )
}
export default Overlay
