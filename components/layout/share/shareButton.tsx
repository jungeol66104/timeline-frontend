import React, {RefObject, useEffect, useRef} from 'react';
import Image from 'next/image'
import {useDispatch, useSelector} from "react-redux";
import {getClickOrTouch} from "@/utils/global";
import {updateIsShare} from "@/store/slices/appearanceSlice";

const ShareButton = () => {
    const shareButtonRef : RefObject<HTMLDivElement> = useRef(null)

    const dispatch = useDispatch()
    let isSwipe = false

    useEffect(() => {
        const shareButton = shareButtonRef.current
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!shareButton || !scrollWrapper) return

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

        shareButton.addEventListener('click', handleClickShareButton)
        shareButton.addEventListener('touchend', handleClickShareButton)
        scrollWrapper.addEventListener('touchmove', () => isSwipe = true)
        scrollWrapper.addEventListener('touchend', () => isSwipe = false)
        return () => {
            shareButton.removeEventListener('click', handleClickShareButton)
            shareButton.removeEventListener('touchend', handleClickShareButton)
            scrollWrapper.removeEventListener('touchmove', () => isSwipe = true)
            scrollWrapper.removeEventListener('touchend', () => isSwipe = false)
        }
    }, []);

    return (
        <div ref={shareButtonRef} className={'cursor-pointer flex items-center pr-[6px] h-[24px] mb-[0.5px] rounded-sm bg-white border-[0.1px] shadow-[0_2px_3px_rgba(0,0,0,0.07)]'}>
            <div className={'flex w-[24px] h-[24px] items-center justify-center'}>
                <Image src={'/svg/share.svg'} alt={'share'} width={14} height={14}/>
            </div>
            <div className={'text-xs font-semibold'}>Share</div>
        </div>
    );
};

export default ShareButton;
