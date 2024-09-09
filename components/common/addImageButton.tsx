import axios from "axios";
import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimeline, updateCurrentTimelineDraft, updateEventInCurrentEvents} from "@/store/slices/contentsSlice";

const AddImageButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        if (timelineType !== 'demo') {
            const image = new Image();
            const objectURL = URL.createObjectURL(file);

            image.onload = async () => {
                const imageSize = {width: image.width, height: image.height}

                URL.revokeObjectURL(objectURL);

                try {
                    const formData = new FormData();
                    formData.append('image', file);

                    const response = await axios.post('/api/wiki/upload-image', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                    const imagePath = response.data.imagePath;

                    if (modalType === 'none') {
                        if (timelineType === 'new') {
                            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, imagePath, imageSize}))
                        } else {
                            // save timeline to the db
                            dispatch(updateCurrentTimeline({...currentTimeline, imagePath, imageSize}))
                            dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, imagePath, imageSize}))
                        }
                    } else if (modalType === 'information') {
                        dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, imagePath, imageSize}))
                    } else if (modalType === 'event') {
                        dispatch(updateCurrentEventDraft({...currentEventDraft, imagePath, imageSize}))
                        if (timelineType === 'new' && isCreated) dispatch(updateEventInCurrentEvents({...currentEventDraft, imagePath, imageSize}))
                    }
                } catch (error) {console.error('Error uploading image:', error)}
            }
            image.src = objectURL
        } else {
            const reader = new FileReader()
            reader.onloadend = () => {
                const imagePath = reader.result
                if (!imagePath) return
                const image = new Image()
                image.onload = () => {
                    const imageSize = {width: image.width, height: image.height}

                    if (modalType === 'none') {
                        dispatch(updateCurrentTimeline({...currentTimeline, imagePath, imageSize}))
                        dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, imagePath, imageSize}))
                    } else if (modalType === 'information') {
                        dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, imagePath, imageSize}))
                    } else if (modalType === 'event') {
                        dispatch(updateCurrentEventDraft({...currentEventDraft, imagePath, imageSize}))
                    }
                }
                image.src = imagePath as string
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <label className={`cursor-pointer flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md ${modalType === 'none' && 'opacity-70'}`}>
            <div className={'material-symbols-outlined text-[22px]'}>&#xe43e;</div>
            <input className={'hidden'} type={'file'} accept={'.png,.jpg,.jpeg'} onChange={handleChange} />
        </label>
    );
};

export default AddImageButton;
