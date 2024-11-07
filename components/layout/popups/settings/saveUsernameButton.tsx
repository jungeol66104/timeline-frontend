import axios from "axios";
import React from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectProfileDraft} from "@/store/slices/privateSlice";
import {selectErrorType, updateErrorType, updatePopupType} from "@/store/slices/appearanceSlice";
import {getIsBaseImage} from "@/utils/global";
import api from "@/pages/api/api";

const SaveUsernameButton = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const profileDraft = useSelector(selectProfileDraft)
    const errorType = useSelector(selectErrorType);

    const handleClick = async () => {
        if (errorType === 'username') return

        const checkResponse = await api.get(`/user/${profileDraft.username}/contribution?pageNum=1&pageSize=1`, {headers: {lang: 'en'}})
        if (checkResponse.data.code !== 69999) {
            dispatch(updateErrorType('duplicateUsername'))
            return
        }

        const formData = new FormData();
        formData.append('username', profileDraft.username)
        formData.append('isBaseImage', String(Number(getIsBaseImage(profileDraft.imagePath))))

        const updateResponse = await axios.put('/api/user/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        if (updateResponse.data.code === 69999) return

        dispatch(updatePopupType('none'))
        window.location.href = `/@${profileDraft.username}`
    }

    return (
        <button onClick={handleClick} className={`w-full flex items-center justify-center gap-1.5 h-[36px] text-sm font-medium border-[0.1px] border-gray-300 bg-black text-white drop-shadow-sm rounded-md`}>Save</button>
    );
};

export default SaveUsernameButton;
