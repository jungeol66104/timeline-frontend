import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectProfileDraft, updateProfileDraft} from "@/store/slices/privateSlice";
import SaveUsernameButton from "@/components/layout/popups/settings/saveUsernameButton";
import {selectErrorType, updateErrorType} from "@/store/slices/appearanceSlice";

const UsernameSetting = () => {
    const usernameSettingRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch()
    const errorType = useSelector(selectErrorType);
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value.length > 30) return
        else {
            const usernameRegex = /^$|^[a-z0-9_]+$/;
            if (!usernameRegex.test(value)) return

            const editorPrefixRegex = /^editor_\d+$/;
            if (editorPrefixRegex.test(value)) dispatch(updateErrorType('username'))
            else dispatch(updateErrorType('none'))
            dispatch(updateProfileDraft({...profileDraft, username:e.target.value}))
        }
    }

    return (
        <div ref={usernameSettingRef} onClick={handleClick} className={`p-3 w-full border-[1px] ${isToggle ? 'border-black' : 'cursor-pointer hover:bg-gray-100 border-gray-300'} rounded-md`}>
            <div className={'flex items-center justify-between'}>
                <h3 className={'font-semibold'}>Username</h3>
                <div className={`${!isToggle && 'hidden'} text-xs font-normal ${profileDraft.username.length >= 30 ? 'text-red-700' : 'text-gray-600'}`}>{profileDraft.username.length}/30</div>
            </div>
            <input ref={inputRef} className={`w-full font-normal bg-transparent ${!isToggle && 'text-gray-400 cursor-pointer'} focus:outline-none`} type={'text'} value={profileDraft.username} onChange={handleChange}/>
            <div className={`${(!isToggle || errorType !== 'username') && 'hidden'} text-xs text-red-700`}>you cannot change your username to editor_#</div>
            <div className={`${(!isToggle || errorType !== 'duplicateUsername') && 'hidden'} text-xs text-red-700`}>username already taken</div>
            <div className={`${!isToggle && 'hidden'} mt-3`}><SaveUsernameButton /></div>
        </div>
    );
};

export default UsernameSetting;
