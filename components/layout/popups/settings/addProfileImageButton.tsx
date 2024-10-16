import React, {ChangeEvent} from 'react';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectSession, updateProfile, updateProfileDraft, updateSession} from "@/store/slices/privateSlice";
import {useRouter} from "next/router";

const AddProfileImageButton = () => {
    const router = useRouter()
    const dispatch = useDispatch()
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
                formData.append('isBaseImage', '0')

                const updateResponse = await axios.put('/api/user/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                if (updateResponse.data.code === 69999) return

                const sessionResponse = await axios.get('/api/user/session')
                const data = sessionResponse.data
                dispatch(updateSession(data))
                dispatch(updateProfile({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))
                dispatch(updateProfileDraft({username: data.username, imagePath: data.imagePath, cdnUrl: data.cdnUrl}))

                console.log('hi')
                router.push(router.asPath)
            } catch (error) {console.error('Error uploading image:', error)}
        }
        image.src = objectURL
    }

    return (
        <label
            className={`cursor-pointer flex items-center justify-center w-9 h-9 bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md opacity-90`}>
            <div className={'material-symbols-outlined text-[22px]'}>&#xe43e;</div>
            <input className={'hidden'} type={'file'} accept={'.png,.jpg,.jpeg'} onChange={handleChange}/>
        </label>
    );
};

export default AddProfileImageButton;
