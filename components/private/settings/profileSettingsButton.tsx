import React, {useState} from 'react';
import {selectPopupType, updatePopupType} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import Popup from "@/components/layout/popups/popup";
import {selectIsSession, selectSession} from "@/store/slices/privateSlice";
import AddImageButton from "@/components/common/addImageButton";
import DeleteAccountButton from "@/components/private/settings/deleteAccountButton";
import SaveSettingsButton from "@/components/private/settings/saveSettingsButton";
import UsernameSetting from "@/components/private/settings/usernameSetting";

const ProfileSettingsButton = () => {
    const dispatch = useDispatch()
    const popupType = useSelector(selectPopupType)

    return (
        <>
            <button onClick={() => dispatch(updatePopupType('settings'))} className={`w-[28px] h-[28px] flex items-center justify-center hover:text-blue-700`}>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf02e;</div>
            </button>
            {popupType === 'settings' &&
                <Popup title={'Settings'}>
                    <div className={'flex flex-col items-center gap-5 font-medium'}>
                        <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-100 border-[1px] border-gray-300 shrink-0'}><AddImageButton /></div>
                        <UsernameSetting />
                        <div className={'w-full flex flex-col gap-2'}>
                            <SaveSettingsButton />
                            <DeleteAccountButton />
                        </div>
                    </div>
                </Popup>
            }
        </>
    )
}
export default ProfileSettingsButton;
