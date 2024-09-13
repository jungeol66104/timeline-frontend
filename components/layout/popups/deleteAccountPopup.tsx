import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";
import Popup from "@/components/layout/popups/popup";

import axios from "axios";
import {useRouter} from "next/router";

const DeleteAccountPopup = () => {
    const usernameSettingRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter()
    const session = useSelector(selectSession);
    const [usernameDraft, setUsernameDraft] = useState('')
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const usernameSetting = usernameSettingRef.current
        if (!usernameSetting) return
        e.stopPropagation()
        setIsToggle(true)

        const input = inputRef.current
        if (!input) return
        input.focus()

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!usernameSetting.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    const handleSubmit = async () => {
        if (session.username !== usernameDraft) return

        try {
            const response = await axios.delete('/api/user/delete', {data: { "email": 'session.email' }});
            if (response.status === 200) {
                if (response.data.code === 69999) return
                router.push('/')
            }
        } catch (error) {console.error('Error deleting user: ', error)}
    }

    return (
        <Popup title={'Delete Account'}>
            <div>
                <div className={'flex flex-col gap-3 font-medium'}>
                    <div ref={usernameSettingRef} onClick={handleClick} className={`p-3 w-full border-[1px] ${isToggle ? 'border-black' : 'cursor-pointer hover:bg-gray-100 border-gray-300'} rounded-md`}>
                        <h3 className={'font-semibold'}>Username</h3>
                        <input ref={inputRef} className={`w-full font-normal bg-transparent ${!isToggle && 'text-gray-400 cursor-pointer'} focus:outline-none`} type={'text'} value={usernameDraft} placeholder={'Type your username'} readOnly={!isToggle} onChange={(e) => setUsernameDraft(e.target.value)}/>
                    </div>
                    <button onClick={handleSubmit} className={`w-full h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-red-700 drop-shadow-sm rounded-md`}>Delete Account</button>
                </div>
            </div>
        </Popup>
    );
};

export default DeleteAccountPopup;
