import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentTimelineDraft, updateCurrentEventDraft, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const ReplaceImageButtonTest = () => {
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
        <>
            {modalType === 'information' || modalType === 'event'
                ?   <label className={'cursor-pointer w-9 h-9 flex items-center justify-center bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>
                        <div className={'material-symbols-outlined text-[20px]'}>&#xf824;</div>
                        <input className={'hidden'} type={'file'} accept={'image/*'} onChange={handleChange}/>
                    </label>
                :   <label className={`cursor-pointer w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
                        <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf824;</div>
                        <div className={'text-sm font-semibold'}>Replace</div>
                        <input className={'hidden'} type={'file'} accept={'image/*'} onChange={handleChange}/>
                    </label>
            }
        </>
    );
};

export default ReplaceImageButtonTest;