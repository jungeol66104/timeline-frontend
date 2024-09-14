import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";

const RemoveProfileImageButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const currentEvents = useSelector(selectCurrentEvents)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const handleClick = () => {
        const baseImagePath = 'base-image.png'
        if (modalType === 'information') {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, imagePath: baseImagePath, imageSize: {width: 100, height: 100}}))
        } else if (modalType === 'event') {
            dispatch(updateCurrentEventDraft({...currentEventDraft, imagePath: baseImagePath, imageSize: {width: 100, height: 100}}))
            if (timelineType === 'new' && isCreated) dispatch(updateEventInCurrentEvents({...currentEventDraft, imagePath: baseImagePath, imageSize: {width: 100, height: 100}}))
        }
    }

    return (
        <button onClick={handleClick} className={`px-2.5 w-full h-[36px] flex items-center gap-2 rounded-md bg-white hover:bg-gray-100 text-left`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf022;</div>
            <div className={'text-sm font-semibold'}>Remove</div>
        </button>
    );
};

export default RemoveProfileImageButton;
