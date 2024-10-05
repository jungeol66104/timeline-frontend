import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsSession} from "@/store/slices/privateSlice";
import {useRouter} from "next/router";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const CreateTimelineButton = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)

    const handleClick = () => {
        if (isSession) router.push('/timelines/new')
        else dispatch(updatePopupType('signIn'))
    }

    return (
        <div onClick={handleClick} className={`cursor-pointer flex items-center gap-1.5 max-[850px]:gap-2 pl-2.5 pr-3 max-[850px]:px-2.5 h-[30px] max-[850px]:h-[36px] max-[850px]:w-full font-semibold min-[850px]:border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 min-[850px]:drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe03b;</div>
            <div className={'text-sm font-semibold max-[850px]:w-full'}>Create</div>
        </div>
    );
};

export default CreateTimelineButton;
