import React from 'react';
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";

const RemoveImageButton = ({isMenu = false}: {isMenu?: boolean}) => {
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
        <>
            {!isMenu && <button onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xf022;</button>}
            {isMenu &&
                <button onClick={handleClick} className={`px-2.5 w-full h-[36px] flex items-center gap-2 rounded-md bg-white hover:bg-gray-100 text-left`}>
                    <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf022;</div>
                    <div className={'text-sm font-semibold'}>Remove</div>
                </button>
            }
        </>

    );
};

export default RemoveImageButton;
