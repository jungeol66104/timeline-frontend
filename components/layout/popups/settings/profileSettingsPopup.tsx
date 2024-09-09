import React from 'react';
import Popup from "@/components/layout/popups/popup";
import AddImageButton from "@/components/common/addImageButton";
import UsernameSetting from "@/components/layout/popups/settings/usernameSetting";
import SaveSettingsButton from "@/components/layout/popups/settings/saveSettingsButton";
import DeleteAccountButton from "@/components/layout/popups/settings/deleteAccountButton";

const ProfileSettingsPopup = () => {
    return (
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
    );
};

export default ProfileSettingsPopup;
