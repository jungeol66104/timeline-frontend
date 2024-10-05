import React from 'react';
import {useRouter} from "next/router";
import {selectIsSession, updateSession} from "@/store/slices/privateSlice";
import {useDispatch, useSelector} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const LogInOutButton = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const isSession = useSelector(selectIsSession)

    const handleClick = async () => {
        const redirectPath = router.asPath;
        if (isSession) window.location.href = `/api/user/signout?redirectPath=${encodeURIComponent(redirectPath)}`
        else dispatch(updatePopupType('signIn'))
    }

    return (
        <button onClick={handleClick} className={'h-[36px] w-full flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100'}>
            {isSession
                ?   <>
                        <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe9ba;</div>
                        <div className={'text-sm font-semibold'}>Log Out</div>
                    </>
                :   <>
                        <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xea77;</div>
                        <div className={'text-sm font-semibold'}>Log In / Sign Up</div>
                    </>
            }
        </button>
    );
};

export default LogInOutButton;
