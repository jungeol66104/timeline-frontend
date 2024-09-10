import axios from "axios";
import React from 'react';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectProfileDraft} from "@/store/slices/privateSlice";

const SaveUsernameButton = () => {
    const router = useRouter()
    const profileDraft = useSelector(selectProfileDraft)

    const handleClick = async () => {

        const formData = new FormData();
        formData.append('username', profileDraft.username)

        const updateResponse = await axios.put('/api/user/update', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        if (updateResponse.data.code === 69999) return

        router.push(`/@${profileDraft.username}`)
    }

    return (
        <button onClick={handleClick} className={`w-full flex items-center justify-center gap-1.5 h-[36px] text-sm font-medium border-[0.1px] border-gray-300 bg-black text-white drop-shadow-sm rounded-md`}>Save</button>
    );
};

export default SaveUsernameButton;
