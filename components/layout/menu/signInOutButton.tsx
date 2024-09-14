import React from 'react';
import {useRouter} from "next/router";
import {selectIsSession, updateSession} from "@/store/slices/privateSlice";
import {useDispatch, useSelector} from "react-redux";
import {getSession} from "@/utils/global";

const SignInOutButton = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const isSession = useSelector(selectIsSession)

    const handleClick = async () => {
        const redirectPath = router.asPath;
        if (isSession) router.push(`/api/user/signout?redirectPath=${encodeURIComponent(redirectPath)}`);
        else {
            window.open(`/api/user/signin?redirectPath=${encodeURIComponent(redirectPath)}`, 'google-signin-popup', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);

            window.addEventListener('message', (event) => {
                if (event.origin !== window.location.origin) return;
                if (event.data.type === 'SIGNIN_SUCCESS') {
                    getSession().then((session) => {
                        dispatch(updateSession(session));
                    })
                }
            });
        }
    }

    return (
        <button onClick={handleClick} className={'h-[36px] w-full flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100'}>
            {isSession
                ?   <>
                        <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe9ba;</div>
                        <div className={'text-sm font-semibold'}>Sign Out</div>
                    </>
                :   <>
                        <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xea77;</div>
                        <div className={'text-sm font-semibold'}>Sign In</div>
                    </>
            }
        </button>
    );
};

export default SignInOutButton;
