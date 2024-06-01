import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import NorthSVG from "@/public/svg/north.svg";
import {Timeline} from "@/store/slices/contentsSlice";

const BackToTimelineButton = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [timeline, setTimeline] = useState<Timeline>({id: 1, name: '', description: '', image: '', content: null})
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return

        const history = JSON.parse(sessionStorage.getItem('history') || '{}')
        let latestHistory = history["0"]
        const url = latestHistory["url"]
        const state = latestHistory["state"]
        if (url.startsWith("/timelines")) {
            setTimeline(state["contents"]["currentTimeline"])
            setShowButton(true)
        }
    }, []);

    return (
        <div className={`sticky bottom-0 w-full ${!showButton && 'hidden'}`} style={{zIndex: 4998}}>
            <button className={'toolbar absolute right-0 bottom-[20px] flex border-[0.1px] border-gray-300 rounded-lg bg-white drop-shadow-md h-fit w-fit'}>
                <div>
                    <div>Back to the Timeline</div>
                    <div></div>
                </div>
            </button>
        </div>
    );
};
export default BackToTimelineButton;
