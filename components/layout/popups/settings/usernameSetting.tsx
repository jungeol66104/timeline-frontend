import React, {useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";

const UsernameSetting = () => {
    const usernameSettingRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const session = useSelector(selectSession)
    const [usernameDraft, setUsernameDraft] = useState(session.username!)
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

    return (
        <div ref={usernameSettingRef} onClick={handleClick} className={`p-3 w-full border-[1px] ${isToggle ? 'border-black' : 'cursor-pointer hover:bg-gray-100 border-gray-300'} rounded-md`}>
            <h3 className={'font-semibold'}>Username</h3>
            <input ref={inputRef} className={`w-full bg-transparent ${!isToggle && 'text-gray-400 cursor-pointer'} focus:outline-none`} type={'text'} value={usernameDraft} readOnly={!isToggle} onChange={(e) => setUsernameDraft(e.target.value)}/>
        </div>
    );
};

export default UsernameSetting;
