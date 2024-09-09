import React from 'react';
import ProfileHead from "@/components/private/profileHead";
import ProfileBody from "@/components/private/profileBody";

const ProfileSectionPrimary = () => {
    return (
        <div className={'relative px-4 flex flex-col w-full h-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <ProfileHead />
            <ProfileBody />
        </div>
    )
}

export default ProfileSectionPrimary;
