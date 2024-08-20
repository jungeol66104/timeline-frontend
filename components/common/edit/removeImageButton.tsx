import React from 'react';
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";

const RemoveImageButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const currentEvents = useSelector(selectCurrentEvents)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const handleClick = () => {
        const baseImage = 'https://cdn.timeline.vg/base-image.png'
        if (modalType === 'none') {
            dispatch(updateCurrentTimeline({...currentTimeline, image: baseImage, imageSize: {width: 100, height: 100}}))
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: baseImage, imageSize: {width: 100, height: 100}}))
        } else if (modalType === 'information') {
            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: baseImage, imageSize: {width: 100, height: 100}}))
            if (timelineType === 'new') dispatch(updateCurrentTimeline({...currentTimeline, image: baseImage, imageSize: {width: 100, height: 100}}))
        } else if (modalType === 'event') {
            dispatch(updateCurrentEventDraft({...currentEventDraft, image: baseImage, imageSize: {width: 100, height: 100}}))
            if (timelineType === 'new' && isCreated) dispatch(updateEventInCurrentEvents({...currentEventDraft, image: baseImage, imageSize: {width: 100, height: 100}}))
        }
    }

    return (
        <button onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xf022;</button>
    );
};

export default RemoveImageButton;
