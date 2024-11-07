import React from 'react';
import ProfileHead from "@/components/private/profileHead";
import ProfileBody from "@/components/private/profileBody";
import NewProfileHead from "@/components/private/newProfileHead";

const ProfileSectionPrimary = () => {
    return (
        <div className={'relative px-4 flex flex-col w-full h-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <NewProfileHead />
            <ProfileBody />
        </div>
    )
}

export default ProfileSectionPrimary;
