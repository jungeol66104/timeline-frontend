import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectSession, updateProfile, updateProfileDraft, updateSession} from "@/store/slices/privateSlice";
import axios from "axios";

const ReplaceProfileImageButton = () => {
    const dispatch = useDispatch();
    const session = useSelector(selectSession)

    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const image = new Image();
        const objectURL = URL.createObjectURL(file);

        image.onload = async () => {
            URL.revokeObjectURL(objectURL);

            try {
                const formData = new FormData();
                formData.append('username', session.username)
                formData.append('image', file);

                const updateResponse = await axios.put('/api/user/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                if (updateResponse.data.code !== 69999) return

                const sessionResponse = await axios.get('/api/user/session')
                const data = sessionResponse.data
                dispatch(updateSession(data))
                dispatch(updateProfile({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))
                dispatch(updateProfileDraft({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))

            } catch (error) {console.error('Error uploading image:', error)}
        }
        image.src = objectURL
    }

    return (
        <label className={'cursor-pointer px-2.5 w-full h-[36px] flex items-center gap-2 rounded-md bg-white hover:bg-gray-100 text-left'}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xf824;</div>
            <div className={'text-sm font-semibold'}>Replace</div>
            <input className={'hidden'} type={'file'} accept={'.png,.jpg,.jpeg'} onChange={handleChange}/>
        </label>
    );
};

export default ReplaceProfileImageButton;
