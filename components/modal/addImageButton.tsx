import React, {ChangeEvent} from 'react';
import {getIsBaseImage} from "@/utils/global";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, updateCurrentTimeline} from "@/store/slices/contentsSlice";

const AddImageButton = ({src}: {src: string}) => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
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
                    dispatch(updateCurrentTimeline({...currentTimeline, image: newSrc, imageSize: imageSize}))
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