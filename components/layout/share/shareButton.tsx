import React, {RefObject, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import {getClickOrTouch} from "@/utils/global";
import {updateIsShare} from "@/store/slices/appearanceSlice";
import Image from "next/image";

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
        <button ref={shareButtonRef} className={'w-full text-left h-[36px] flex items-center gap-1.5 pl-1.5 pr-3 py-1.5 rounded-md bg-white hover:bg-gray-100'}>
            <div className={'w-5'}><Image src={'/svg/share.svg'} alt={'share'} width={20} height={20}/></div>
                <div className={'text-sm font-semibold'}>Share</div>
        </button>
    );
};

export default ShareButton;
