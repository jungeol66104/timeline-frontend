import React from 'react';
import {useRouter} from "next/router";
import {selectIsSession} from "@/store/slices/personalSlice";
import {useSelector} from "react-redux";

const SignInButton = () => {
    const router = useRouter()
    const isSession = useSelector(selectIsSession)

    const handleClick = async () => {
        const redirectPath = router.asPath;
        if (isSession) {
            router.push(`/api/auth/signout?redirectPath=${encodeURIComponent(redirectPath)}`);
        }
        else {
            router.push(`/api/auth/signin?redirectPath=${encodeURIComponent(redirectPath)}`);
        }
    }

    return (
        <button onClick={handleClick} className={'h-[36px] w-full flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100'}>
            {isSession
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
