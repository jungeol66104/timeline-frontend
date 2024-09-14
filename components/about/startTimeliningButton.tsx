import React from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSession, updateSession} from "@/store/slices/privateSlice";
import {getSession} from "@/utils/global";

const StartTimeliningButton = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)

    const handleClick = () => {
        if (isSession) router.push('/timelines/new')
        else {
            window.open(`/api/user/signin`, 'google-login-popup', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);

            window.addEventListener('message', (event) => {
                if (event.origin !== window.location.origin) return;
                if (event.data.type === 'SIGNIN_SUCCESS') {
                    getSession().then((session) => {
                        dispatch(updateSession(session));
                        window.open('/timelines/new', '_self')
                    })
                }
            });
        }
    }

    return (
        <div onClick={handleClick} className={`cursor-pointer px-5 h-[40px] flex justify-center items-center gap-2 font-medium text-white rounded-full border-[1px] border-black bg-black`}>Start Timelining</div>
    );
};

export default StartTimeliningButton;
