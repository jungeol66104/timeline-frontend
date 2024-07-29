import React from 'react';
import ProfileBody from "@/components/private/profileBody";
import ProfileHead from "@/components/private/profileHead";

const ProfileSectionPrimary = () => {
    return (
        <div className={'relative p-4 pb-0 flex flex-col gap-3 w-full h-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <ProfileHead />
            <ProfileBody />
        </div>
    )
}

export default ProfileSectionPrimary;
