import React from 'react';
import Popup from "@/components/layout/popups/popup";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectIsSession} from "@/store/slices/privateSlice";


const SignInPopup = () => {
    const router = useRouter()
    const isSession = useSelector(selectIsSession)

    const handleClick = async () => {
        const redirectPath = router.asPath;
        if (!isSession) router.push(`/api/auth/signin?redirectPath=${encodeURIComponent(redirectPath)}`);
    }

    return (
        <Popup title={'Sign In'}>
            <div className={'flex flex-col items-center gap-5 font-medium'}>
                <div className={'text-2xl font-bold'}>Be part of us!</div>
                <div>After a quick sign in, you can create timelines, edit them, and much more.</div>
                <div className={'text-sm'}>We currently aim for simplicity. Thus, only google sign in is supported.</div>
                <button onClick={handleClick} className={`w-full flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-black text-white drop-shadow-sm rounded-md`}><div className={'text-sm font-medium'}>Sign In</div></button>
            </div>
        </Popup>
    );
};

export default SignInPopup;
