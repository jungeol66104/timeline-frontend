import React, {ChangeEvent} from 'react';
import {getIsBaseImage} from "@/utils/global";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectModalType} from "@/store/slices/appearanceSlice";

const AddImageButton = ({src}: {src: string}) => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const isBaseImage = getIsBaseImage(src)

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
        <label className={`${!isBaseImage && 'invisible'} px-2 flex items-center justify-center h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[22px]'}>&#xe43e;</div>
            <input className={'hidden'} type={'file'} accept={'image/*'} onChange={handleChange} />
        </label>
    );
};

export default AddImageButton;
