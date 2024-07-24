import React, {useRef, useState} from 'react';
import Image from "next/image";
import {mapStrToNum} from "@/utils/global";
import Link from "next/link";

const ConnectedTimelinesButton = () => {
    // dummy data
    const connectedTimelines = ['Mike Tyson', 'Jake Paul', 'Joon Nam', 'Donald Trump', 'Donggeun Suh']

    const connectedTimelinesButtonRef = useRef<HTMLButtonElement>(null)
    const [isToggle, setIsToggle] = useState(false)

    const handleClick = (e: React.MouseEvent) => {
        const connectedTimelinesButton = connectedTimelinesButtonRef.current
        if (!connectedTimelinesButton) return
        e.stopPropagation()
        setIsToggle(true)

        document.addEventListener('click', function hideMenu (e: MouseEvent) {
            if (!connectedTimelinesButton.contains(e.target as Node)) {
                setIsToggle(false)
                document.removeEventListener('click', hideMenu)
            }
        })
    }

    return (
        <div className={'relative shrink-0'}>
            <button ref={connectedTimelinesButtonRef} onClick={handleClick} className={`px-3 max-[852px]:px-2 w-fit h-[36px] flex items-center gap-2.5 border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                <div className={'text-sm font-semibold max-[852px]:hidden'}>Connected Timelines</div>
                <div className={'flex gap-1.5 justify-center items-center'}>
                    <div className={'relative w-[26px] h-[26px] flex items-center justify-center rounded-sm'}>
                        <Image src={`/images/base-image/base-image${mapStrToNum(connectedTimelines[0])}.jpg`} alt={'base-image'} fill priority={true} className={'rounded-sm border-[1px] border-white'}/>
                        <span className={'text-white text-xs z-10'}>{connectedTimelines[0].substring(0, 1).toUpperCase()}</span>
                    </div>
                    <span className={'text-sm font-semibold'}>+4</span>
                </div>
            </button>
            {isToggle &&
                <div className={'overflow-y-scroll absolute top-[38px] left-0 p-1.5 w-[250px] bg-white border-[1px] rounded-md shadow-md'}>
                    {connectedTimelines.map((timeline, i) => {
                        const initial = timeline.substring(0, 1).toUpperCase();

                        return (
                            <Link key={i} href={'/'} className={'p-1.5 flex w-full items-center gap-1.5'}>
                                <div className={'relative w-[26px] h-[26px] flex items-center justify-center rounded-sm'}>
                                    <Image src={`/images/base-image/base-image${mapStrToNum(timeline)}.jpg`} alt={'base-image'} fill priority={true} className={'rounded-sm border-[1px] border-white'}/>
                                    <span className={'text-white text-xs z-10'}>{initial}</span>
                                </div>
                                <div className={'text-sm font-medium'}>{timeline}</div>
                            </Link>
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default ConnectedTimelinesButton;
