import React, {useState} from 'react';
import {signIn, signOut, useSession} from "next-auth/react";
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";

const SignIn = () => {
    const {data : session} = useSession();
    const timelineModalType = useSelector(selectModalType)

    const handleClick = () => {
        if (session) signOut()
        else signIn('google')
    }

    const bottom = timelineModalType === 'signIn' ? 0 : -150
    return (
        <div className={'signIn fixed w-full max-w-lg h-[150px] left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex:5002, bottom: bottom,  transition: 'bottom 0.3s'}}>
            <h2 className={'font-semibold text-md py-2.5 border-b-[1px] w-full text-center'}>Sign In</h2>
            <div className={'w-full px-5 shrink-0 flex gap-[30px] py-5 overflow-x-auto'}>
            </div>
        </div>
    );
};

export default SignIn;
