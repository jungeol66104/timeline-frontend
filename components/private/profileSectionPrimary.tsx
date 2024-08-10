import React from 'react';
import ProfileBody from "@/components/private/profileBody";
import ProfileHead from "@/components/private/profileHead";

const ProfileSectionPrimary = () => {
    return (
        <div className={'relative px-4 flex flex-col w-full h-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <ProfileHead />
            <ProfileBody />
        </div>
    )
}

export default ProfileSectionPrimary;
