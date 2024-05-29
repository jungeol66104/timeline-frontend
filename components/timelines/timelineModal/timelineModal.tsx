import React, {useEffect, useRef} from 'react';
import {capitalize, formatDate} from "@/utils/global";
import {useSelector} from "react-redux";
import {selectTimelineModalType} from "@/store/slices/appearanceSlice";
import LinkCopyButton from "@/components/layout/share/linkCopyButton";
import XButton from "@/components/layout/share/xButton";
import FacebookButton from "@/components/layout/share/facebookButton";
import KakaotalkButton from "@/components/layout/share/kakaotalkButton";

const TimelineModal = () => {
    const timelineModalType = useSelector(selectTimelineModalType)

    const bottom = timelineModalType !== 'none' ? 0 : -150
    return (
        <>
            <div className={'timelineModal fixed w-full max-w-lg h-[150px] left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex:5002, bottom: bottom, transition: 'bottom 0.3s'}}>
                <h2 className={'font-semibold text-md py-2.5 border-b-[1px] w-full h-[44px] text-center'}>{timelineModalType !== 'none' && capitalize(timelineModalType)}</h2>
                <div className={'w-full px-5 shrink-0 flex gap-[30px] py-5 overflow-x-auto'}>
                    <LinkCopyButton />
                    <XButton />
                    <FacebookButton />
                    <KakaotalkButton />
                </div>
            </div>
        </>

    );
}
export default TimelineModal;
