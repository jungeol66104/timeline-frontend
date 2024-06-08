import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsShare, selectTimelineModalType, updateIsEdit, updateIsShare, updateTimelineModalType} from "@/store/slices/appearanceSlice";
import {getBody} from "@/utils/global";

const Overlay = () => {
    const dispatch = useDispatch()
    const isShare = useSelector(selectIsShare)
    const timelineModalType = useSelector(selectTimelineModalType)
    const overlay = isShare || timelineModalType !== 'none'

    const handleClick = () => {
        if (isShare) dispatch(updateIsShare())
        else if (timelineModalType !== 'none') {
            const body = getBody()
            if (!body) return

            dispatch(updateIsEdit(false))
            dispatch(updateTimelineModalType('none'))
        }
    }

    return (
        <div onClick={handleClick} className={`${overlay ? 'opacity-30' : 'pointer-events-none opacity-0'} absolute w-full h-full top-0 bg-black`} style={{zIndex: 5001, transition: 'opacity 0.3s'}}></div>
    )
}
export default Overlay
