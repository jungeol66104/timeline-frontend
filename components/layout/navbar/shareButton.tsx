import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {getClickOrTouch} from "@/utils/global";
import {updateIsShare} from "@/store/slices/appearanceSlice";

const ShareButton = () => {
    const shareButtonRef : RefObject<HTMLButtonElement> = useRef(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const shareButton = shareButtonRef.current
        if (!shareButton) return

        const handleClickShareButton = async () => {
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
        return () => {
            shareButton.removeEventListener('click', handleClickShareButton)
            shareButton.removeEventListener('touchend', handleClickShareButton)
        }
    });

    return (
        <button ref={shareButtonRef} className={'w-full text-left h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100'}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe80d;</div>
            <div className={'text-sm font-semibold'}>Share</div>
        </button>
    );
};

export default ShareButton;
