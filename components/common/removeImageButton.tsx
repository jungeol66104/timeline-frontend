import React from 'react';
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";

const RemoveImageButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = () => {
        const baseImage = 'https://cdn.timeline.vg/base-image.png'
        if (modalType === 'information') dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: baseImage, imageSize: {width: 0, height: 0}}))
        else dispatch(updateCurrentEventDraft({...currentEventDraft, image: baseImage, imageSize: {width: 0, height: 0}}))
    }

    return (
        <button onClick={handleClick} className={'px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100 rounded-r-md'}>
            <div className={'material-symbols-outlined text-[22px]'}>&#xe15b;</div>
        </button>
    );
};

export default RemoveImageButton;
