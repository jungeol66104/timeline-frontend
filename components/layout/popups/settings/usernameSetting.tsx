import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectProfileDraft, updateProfileDraft} from "@/store/slices/privateSlice";
import SaveUsernameButton from "@/components/layout/popups/settings/saveUsernameButton";

const UsernameSetting = () => {
    const usernameSettingRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch()
    const profileDraft = useSelector(selectProfileDraft)
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
            <input ref={inputRef} className={`w-full font-normal bg-transparent ${!isToggle && 'text-gray-400 cursor-pointer'} focus:outline-none`} type={'text'} value={profileDraft.username} readOnly={!isToggle} onChange={(e) => dispatch(updateProfileDraft({...profileDraft, username:e.target.value}))}/>
            <div className={`${!isToggle && 'hidden'} mt-3`}><SaveUsernameButton /></div>
        </div>
    );
};

export default UsernameSetting;
