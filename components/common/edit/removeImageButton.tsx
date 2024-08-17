import React from 'react';
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";

const RemoveImageButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isTimeline = modalType === 'information' || modalType === 'none'

    const handleClick = () => {
        const baseImage = 'https://cdn.timeline.vg/base-image.png'
        if (isTimeline) dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: baseImage, imageSize: {width: 100, height: 100}}))
        else dispatch(updateCurrentEventDraft({...currentEventDraft, image: baseImage, imageSize: {width: 100, height: 100}}))
    }

    return (
        <>
            {modalType === 'information' || modalType === 'event'
                ?   <button onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xf022;</button>
                :   <button onClick={handleClick} className={`w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
                        <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf022;</div>
                        <div className={'text-sm font-semibold'}>Remove</div>
                    </button>
            }
        </>
    );
};

export default RemoveImageButton;
