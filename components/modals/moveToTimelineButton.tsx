import React from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {updateModalType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const MoveToTimelineButton = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline);

    const activateButton = /^\/@[a-zA-Z0-9_.~-]+$/.test(router.asPath) || router.asPath.startsWith('/histories')

    const handleClick = () => {
        dispatch(updateModalType('none'))
        router.push(`/timelines/${currentTimeline.id}`)
    }

    return (
        <button onClick={handleClick} className={`${!activateButton && 'hidden'} absolute top-1 left-1 flex items-center pl-2 pr-3 max-[852px]:px-2 h-[36px] hover:bg-gray-100 rounded-2xl shrink-0`}>
            <span className={'material-symbols-outlined text-[20px]'}>&#xe5cb;</span>
            <span className={'mt-[1px] text-sm font-semibold'}>{currentTimeline.title}</span>
        </button>
    );
};

export default MoveToTimelineButton;
