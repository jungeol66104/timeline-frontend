import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateEventContentType, updateEventHistoryType, updateModalType} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import React from "react";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {getIsBaseImage} from "@/utils/global";
import Link from "next/link";
import {useRouter} from "next/router";

const MoveToTimelineButton = () => {
    const router = useRouter()
    const activateButton = router.asPath.startsWith('/@') || router.asPath.startsWith('/histories')

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline);
    const timelineType = useSelector(selectTimelineType)

    const src = currentTimeline.cdnUrl! + currentTimeline.imagePath!
    const isBaseImage = getIsBaseImage(src)

    const handleClick = () => {
        dispatch(updateModalType('none'))
        router.push(`/timelines/${currentTimeline.id}`)
    }

    return (
        <button onClick={handleClick} className={`${!activateButton && 'hidden'} absolute top-1 left-1 flex items-center pl-2 pr-3 max-[852px]:px-2 h-[36px] hover:bg-gray-100 rounded-2xl shrink-0`}>
            <span className={'material-symbols-outlined text-[20px]'}>&#xe5cb;</span>
            {/*{isBaseImage && <div className={'w-[25px] h-[25px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{currentTimeline.title.toUpperCase()}</div>}*/}
            {/*{!isBaseImage && <div className={'overflow-hidden relative w-[25px] h-[25px] rounded-sm border-[1px] border-white shrink-0'}><Image className={'rounded-sm'} src={src} alt={currentTimeline.title} fill priority style={{objectFit: "cover", objectPosition: "top"}}/></div>}*/}
            <span className={'mt-[1px] text-sm font-semibold'}>{currentTimeline.title}</span>
        </button>
    );
};

export default MoveToTimelineButton;
