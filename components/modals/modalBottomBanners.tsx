import React from 'react';
import {selectEventContentType, selectInformationContentType, selectModalType, selectTimelineType, updateEventContentType, updateInformationContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";
import {getIsBaseImage} from "@/utils/global";
import {selectCurrentEvent, selectCurrentTimeline, updateCurrentEvent, updateCurrentEventDraft, updateCurrentTimeline, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const ModalBottomBanners = () => {
    const dispatch = useDispatch();
    const session = useSelector(selectSession)
    const modalType = useSelector(selectModalType)
    const timelineType = useSelector(selectTimelineType);

    const informationContentType = useSelector(selectInformationContentType)
    const eventContentType = useSelector(selectEventContentType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)

    const isSession = Object.keys(session).length !== 0
    const contentType = modalType === 'information' ? informationContentType : eventContentType
    const hide = (timelineType !== 'public') || (contentType !== 'view' && contentType !== 'edit')

    const handleClick = (contentType: string) => {
        if (isSession) {
            if (modalType === 'information') {
                const image = new Image();
                image.src = timelineType === 'demo' && !getIsBaseImage(currentTimeline.imagePath) ? currentTimeline.imagePath! : currentTimeline.cdnUrl! + currentTimeline.imagePath!;
                image.onload = () => {
                    const imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline({...currentTimeline, imageSize}))
                    dispatch(updateCurrentTimelineDraft({...currentTimeline, imageSize}))
                    dispatch(updateInformationContentType(contentType))
                }
            } else {
                const image = new Image();
                image.src = currentEvent.cdnUrl! + currentEvent.imagePath!;
                image.onload = () => {
                    const imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentEvent({...currentEvent, imageSize}))
                    dispatch(updateCurrentEventDraft({...currentEvent, imageSize}))
                    dispatch(updateEventContentType(contentType))
                }
            }
        } else dispatch(updatePopupType('signIn'))
    }

    return (
        <div className={`${hide && 'hidden'} flex flex-1 gap-3 max-[852px]:flex-col`}>
            <div className={'p-3 w-full h-fit flex flex-col gap-3 items-center bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl'}>
                <div className={'w-full flex flex-col items-center'}>
                    <div className={'flex items-center gap-1.5'}>
                        <span className={'text-md'}>🫵</span>
                        <span className={'text-lg font-semibold'}>Contribute to this content!</span>
                    </div>
                    <div className={'text-sm text-gray-500'}>Your input benefits people around the world</div>
                </div>
                <div className={'text-center text-sm font-medium'}>See something to add or edit? Simply click the edit button below to make a difference! All you need is a quick sign in.</div>
                <button onClick={() => handleClick('edit')} className={'p-4 flex items-center justify-center h-[36px] rounded-full bg-gray-600 hover:bg-[#333333] text-white text-sm font-medium border-[0.1px] border-gray-300'}>Edit Content</button>
            </div>
            <div className={'p-3 w-full h-fit flex flex-col gap-3 items-center bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl'}>
                <div className={'w-full flex flex-col items-center'}>
                    <div className={'flex items-center gap-1.5'}>
                        <span className={'text-md'}>💬</span>
                        <span className={'text-lg font-semibold'}>Join our discord community!</span>
                    </div>
                    <div className={'text-sm text-gray-500'}>Connect and collaborate</div>
                </div>
                <div className={'text-center text-sm font-medium'}>Become part of our vibrant community! Share your thoughts, ask questions, and connect with other passionate editors.</div>
                <a href={'https://discord.gg/273PZzCV'} target="_blank" rel="noopener noreferrer" className={'p-4 flex items-center justify-center h-[36px] rounded-full bg-[#6567E9] hover:bg-[#4E50D1] text-white text-sm font-medium border-[0.1px] border-gray-300'}>Join Discord</a>
            </div>
        </div>
    );
};

export default ModalBottomBanners;
