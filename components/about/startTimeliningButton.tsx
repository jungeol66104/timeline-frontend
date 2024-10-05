import React from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSession} from "@/store/slices/privateSlice";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const StartTimeliningButton = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)

    const handleClick = () => {
        if (isSession) router.push('/timelines/new')
        else dispatch(updatePopupType('signIn'))
    }

    return (
        <div onClick={handleClick} className={`cursor-pointer px-5 h-[40px] flex justify-center items-center gap-2 font-medium text-white rounded-full border-[1px] border-black bg-black`}>Start Timelining</div>
    );
};

export default StartTimeliningButton;
