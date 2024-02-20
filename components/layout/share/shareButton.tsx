import React, {RefObject, useEffect, useRef} from 'react';
import Image from 'next/image'
import {useDispatch} from "react-redux";
import {getClickOrTouch} from "@/utils/global";
import {updateIsShare} from "@/store/slices/appearanceSlice";

const ShareButton = ({isMobileSize}:{isMobileSize?: boolean}) => {
    const shareButtonRef : RefObject<HTMLButtonElement> = useRef(null)

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
        <button ref={shareButtonRef} className={'cursor-pointer w-[69px] max-[850px]:w-full text-left'}>
            <div className={'px-3 py-1.5 h-[36px] rounded-3xl bg-white hover:bg-gray-100 font-semibold max-[850px]:rounded-none'}>Share</div>
        </button>
    );
};

export default ShareButton;
