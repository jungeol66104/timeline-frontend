import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const ReplaceImageButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

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
                    if (modalType === 'information') dispatch(updateCurrentTimelineDraft({...currentTimelineDraft, image: newSrc, imageSize: imageSize}))
                    else dispatch(updateCurrentEventDraft({...currentEventDraft, image: newSrc, imageSize: imageSize}))
                }
                image.src = newSrc as string
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <label className={'cursor-pointer px-2 h-full flex items-center justify-center bg-white hover:bg-gray-100 border-r-[1px] border-gray-300 rounded-l-md'}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xe863;</div>
            <input className={'hidden'} type={'file'} accept={'image/*'} onChange={handleChange}/>
        </label>
    );
};

export default ReplaceImageButton;
