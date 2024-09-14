import React from 'react';
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const ProfileSettingsButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('settings'))} className={`w-[28px] h-[28px] flex items-center justify-center hover:text-blue-700`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf02e;</div>
        </button>
    )
}
export default ProfileSettingsButton;
