import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import NorthSVG from "@/public/svg/north.svg";
import {selectIsSummary} from "@/store/slices/appearanceSlice";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";

const Toolbar = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const currentEvents = useSelector(selectCurrentEvents)
    const isSummary = useSelector(selectIsSummary)
    const isSmall = currentEvents.length < 41 && isSummary
    const [buttonText,setButtonText] = useState('Show All')

    // came up with this code for fixing ipad, iphone error
    useEffect(() => {
        const button = buttonRef.current
        if (!button) return

        if (isSummary) {
            button.classList.add('showAll');
            button.classList.remove('summary');
            setButtonText('Show All')
        } else {
            button.classList.add('summary');
            button.classList.remove('showAll');
            setButtonText('Summary')
        }
    }, [isSummary]);

    return (
        <div className={`sticky bottom-0 w-full`} style={{zIndex: 4998}}>
            {isSmall
                ? <div className={'toolbar absolute right-0 bottom-[20px] flex border-[0.1px] border-gray-300 rounded-lg bg-white drop-shadow-md h-[40px] w-[40px]'}>
                    <button className={'toolbarButton uppermost flex items-center justify-center w-[40px]'}>
                        <div><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></div>
                    </button>
                </div>
                : <div className={'toolbar absolute right-0 bottom-[20px] flex border-[0.1px] border-gray-300 rounded-lg bg-white drop-shadow-md h-[40px] w-[120px]'}>
                    <button ref={buttonRef} className={`toolbarButton showALl flex items-center justify-center text-sm font-medium w-[80px]`}>{buttonText}</button>
                    <div className={'border-r-[1px]'}></div>
                    <button className={'toolbarButton uppermost flex items-center justify-center w-[40px]'}>
                        <div><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></div>
                    </button>
                </div>}
        </div>
    );
};
export default Toolbar;
