import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsShare, selectModalType, updateModalContentType, updateModalHistoryType, updateIsShare, updateModalType} from "@/store/slices/appearanceSlice";

const Overlay = () => {
    const dispatch = useDispatch()
    const isShare = useSelector(selectIsShare)
    const timelineModalType = useSelector(selectModalType)
    const overlay = isShare || timelineModalType !== 'none'

    const handleClick = () => {
        if (isShare) dispatch(updateIsShare())
        else if (timelineModalType !== 'none') {
            dispatch(updateModalType('none'))
            dispatch(updateModalContentType('view'))
            dispatch(updateModalHistoryType('list'))
        }
    }

    return (
        <div onClick={handleClick} className={`${overlay ? 'opacity-30' : 'pointer-events-none opacity-0'} absolute w-full h-full top-0 bg-black`} style={{zIndex: 5001, transition: 'opacity 0.3s'}}></div>
    )
}
export default Overlay
