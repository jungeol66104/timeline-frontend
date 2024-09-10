import {getIsBaseImage} from "@/utils/global";
import React from 'react';
import Image from "next/image";
import {useSelector} from "react-redux";
import {selectProfileDraft} from "@/store/slices/privateSlice";
import Popup from "@/components/layout/popups/popup";
import UsernameSetting from "@/components/layout/popups/settings/usernameSetting";
import DeleteAccountButton from "@/components/layout/popups/settings/deleteAccountButton";
import AddProfileImageButton from "@/components/layout/popups/settings/addProfileImageButton";
import ProfileImageEditButton from "@/components/layout/popups/settings/profileImageEditButton";

const ProfileSettingsPopup = () => {
    const profileDraft = useSelector(selectProfileDraft)

    const isBaseImage = getIsBaseImage(profileDraft.imagePath)

    return (
        <Popup title={'Settings'}>
            <div className={'flex flex-col items-center gap-5 font-medium'}>
                <div className={'relative'}>
                    {isBaseImage
                        ?   <div className={'w-[104px] h-[104px] flex items-center justify-center rounded-full bg-gray-100 border-[1px] border-gray-300 shrink-0'}><AddProfileImageButton/></div>
                        :   <div className={'overflow-hidden relative w-[104px] h-[104px] rounded-full border-[1px] border-gray-300 shrink-0'}><Image src={profileDraft.cdnUrl + profileDraft.imagePath} alt={profileDraft.username} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>
                    }
                    <div className={'absolute bottom-0 right-0'}><ProfileImageEditButton /></div>
                </div>
                <UsernameSetting />
                <DeleteAccountButton />
            </div>
        </Popup>
    );
};

export default ProfileSettingsPopup;
