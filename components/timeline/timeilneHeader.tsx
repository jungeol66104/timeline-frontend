import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import {updateIsShare} from "@/store/slices/appearanceSlice";
import Link from "next/link";
import {getClickOrTouch, getIsBaseImage, getScrollWrapper, mapStrToNum} from "@/utils/global";

const TimelineHeader = () => {
    const shareButtonRef : RefObject<HTMLDivElement> = useRef(null)
    const timelineLinkRef : RefObject<HTMLAnchorElement> = useRef(null)

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isBaseImage = getIsBaseImage(currentTimeline.image)

    let isSwipe = false

    useEffect(() => {
        const shareButton = shareButtonRef.current
        const timelineLink = timelineLinkRef.current
        const scrollWrapper = getScrollWrapper()
        if (!shareButton || !timelineLink || !scrollWrapper) return

        const handleClickShareButton = async () => {
            if (isSwipe) return
            if ('share' in navigator && getClickOrTouch() === 'touchend') {
                const title = document.title;
                const text = document.title;
                const url = location.href;
                try {
                    await navigator.share({url , text, title});
                    return
                } catch (error) {
                    console.error('Error fetching for web share api: ', error)
                    return
                }
            } else dispatch(updateIsShare())
            return
        }
        const handleClickTimelineLink = (e: MouseEvent | TouchEvent) => {
            if (isSwipe) return
            e.stopPropagation()
            sessionStorage.clear()
        }

        shareButton.addEventListener('click', handleClickShareButton)
        shareButton.addEventListener('touchend', handleClickShareButton)
        timelineLink.addEventListener('click', handleClickTimelineLink)
        timelineLink.addEventListener('touchend', handleClickTimelineLink)
        scrollWrapper.addEventListener('touchmove', () => isSwipe = true)
        scrollWrapper.addEventListener('touchend', () => isSwipe = false)
        return () => {
            shareButton.removeEventListener('click', handleClickShareButton)
            shareButton.removeEventListener('touchend', handleClickShareButton)
            timelineLink.removeEventListener('click', handleClickTimelineLink)
            timelineLink.removeEventListener('touchend', handleClickTimelineLink)
            scrollWrapper.removeEventListener('touchmove', () => isSwipe = true)
            scrollWrapper.removeEventListener('touchend', () => isSwipe = false)
        }
    }, []);


    return (
        <div className={'timelineHeader h-[60px] bg-white relative w-full flex gap-2.5 items-center'} style={{zIndex: 4999}}>
            <Link ref={timelineLinkRef} href={`/timelines/${currentTimeline.id}`} className={`w-fit font-black text-2xl cursor-pointer`}>
                <div className={'flex gap-2.5 items-center'}>
                    <div className={'text-2xl font-bold line-clamp-1'}>{currentTimeline.name}</div>
                    <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px] shrink-0'}>
                        {isBaseImage
                            ?   <>
                                    <div className={'relative w-full h-full rounded-sm bg-gray-500 text-white flex items-center justify-center text-sm font-medium'}>
                                        <span className={'absolute'}>{currentTimeline.name.charAt(0).toUpperCase()}</span>
                                        <Image src={`/images/base-image/base-image${mapStrToNum(currentTimeline.name)}.jpg`} alt={'base-image'} width={28} height={28} priority={true} className={'rounded-sm'} />
                                    </div>
                                </>
                            :   <Image className={'rounded-sm'} src={currentTimeline.image} alt={currentTimeline.name} width={28} height={28} />
                    }
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TimelineHeader;
