import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import Image from "next/image";
import ShareSVG from "@/public/svg/share.svg"
import {updateIsShare} from "@/store/slices/appearanceSlice";
import Link from "next/link";
import {getClickOrTouch} from "@/utils/global";
import {useRouter} from "next/router";

const TimelineHeader = () => {
    const shareButtonRef : RefObject<HTMLDivElement> = useRef(null)
    const timelineLinkRef : RefObject<HTMLAnchorElement> = useRef(null)


    const router = useRouter()
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)

    let isSwipe = false

    useEffect(() => {
        const shareButton = shareButtonRef.current
        const timelineLink = timelineLinkRef.current
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!shareButton || !timelineLink || !scrollWrapper) return

        const handleClickShareButton = async () => {
            if ('share' in navigator && getClickOrTouch() === 'touch') {
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
        <div className={'timelineHeader relative left-0 w-fit flex gap-2.5 items-center'} style={{zIndex: 4999}}>
            <Link ref={timelineLinkRef} href={`/timelines/${currentTimeline.id}`} className={`w-fit font-black text-2xl cursor-pointer`}>
                <div className={'flex gap-2.5 items-center'}>
                    <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
                    <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px]'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} /></div>
                </div>
            </Link>
            <div ref={shareButtonRef} className={'cursor-pointer flex items-center pr-[6px] h-[24px] mb-[0.5px] rounded-sm bg-white border-[0.1px] shadow-[0_2px_3px_rgba(0,0,0,0.07)]'}>
                <div className={'flex w-[24px] h-[24px] items-center justify-center'}>
                    <Image src={ShareSVG} alt={'share'} width={14} height={14}/>
                </div>
                <div className={'text-xs font-semibold'}>공유</div>
            </div>
        </div>
    );
};

export default TimelineHeader;
