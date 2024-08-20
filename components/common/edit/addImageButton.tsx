import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentEventDraft,
    selectCurrentEvents,
    selectCurrentTimeline,
    selectCurrentTimelineDraft,
    updateCurrentEventDraft,
    updateCurrentTimeline,
    updateCurrentTimelineDraft,
    updateEventInCurrentEvents
} from "@/store/slices/contentsSlice";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";

const AddImageButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const currentEvents = useSelector(selectCurrentEvents)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files) {
            const file = files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                const newSrc = reader.result
                if (!newSrc) return
                const image = new Image()
                image.onload = () => {
                    const imageSize = {width: image.width, height: image.height}

                    if (modalType === 'none') {
                        dispatch(updateCurrentTimeline({...currentTimeline, image: newSrc, imageSize: imageSize}))
                        dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: newSrc, imageSize: imageSize}))
                    } else if (modalType === 'information') {
                        dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: newSrc, imageSize: imageSize}))
                        if (timelineType === 'new') dispatch(updateCurrentTimeline({...currentTimeline, image: newSrc, imageSize: imageSize}))
                    } else if (modalType === 'event') {
                        dispatch(updateCurrentEventDraft({...currentEventDraft, image: newSrc, imageSize: imageSize}))
                        if (timelineType === 'new' && isCreated) dispatch(updateEventInCurrentEvents({...currentEventDraft, image: newSrc, imageSize: imageSize}))
                    }
                }
                image.src = newSrc as string
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <label className={`cursor-pointer flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md ${modalType === 'none' && 'opacity-70'}`}>
            <div className={'material-symbols-outlined text-[22px]'}>&#xe43e;</div>
            <input className={'hidden'} type={'file'} accept={'image/*'} onChange={handleChange} />
        </label>
    );
};

export default AddImageButton;
