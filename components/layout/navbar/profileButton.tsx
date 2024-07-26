import React from 'react';
import Link from "next/link";
import {selectSession} from "@/store/slices/privateSlice";
import {useSelector} from "react-redux";

const ProfileButton = () => {
    const session = useSelector(selectSession)

    return (
        <Link href={`/personal/@${session.nickName || ''}`} className={`w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe7fd;</div>
            <div className={'text-sm font-semibold'}>Profile</div>
        </Link>
    );
};

export default ProfileButton;
