import React from 'react';
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import {updateModalType} from "@/store/slices/appearanceSlice";
import {useDispatch} from "react-redux";

const SignInButton = () => {
    const {data : session} = useSession()
    const dispatch = useDispatch();

    // const handleClick = () => {
    //    dispatch(updateTimelineModalType('signIn'))
    // }

    const handleClick = () => {
        if (session) signOut()
        else signIn('google')
    }

    return (
        <button onClick={handleClick} className={'h-[36px] w-full flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100'}>
            {session
                ? <>
                    <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe9ba;</div>
                    <div className={'text-sm font-semibold'}>Sign Out</div>
                </>
                : <>
                    <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xea77;</div>
                    <div className={'text-sm font-semibold'}>Sign In</div>
                </>
            }

        </button>
    );
};

export default SignInButton;
