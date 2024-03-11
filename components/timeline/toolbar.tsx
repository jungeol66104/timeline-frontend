import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import NorthSVG from "@/public/svg/north.svg";
import {selectCurrentDepth, selectMaxDepth} from "@/store/slices/appearanceSlice";
import {getClickOrTouch} from "@/utils/global";
import {current} from "immer";

const Toolbar = () => {
    const maxDepth = useSelector(selectMaxDepth)
    const currentDepth = useSelector(selectCurrentDepth)

    useEffect(() => {
        const toolbar = typeof window !== 'undefined' ? document.querySelector('.toolbar') : null
        if (!toolbar) return

        if (getClickOrTouch() === 'touchend') toolbar.classList.add('right-4')
    }, []);

    return (
        <div className={`toolbar fixed bottom-[18px] right-8`} style={{zIndex: 4998}}>
            <div className={'flex border-[1px] rounded-lg bg-white/50 drop-shadow-md h-[40px]'}>
                { currentDepth === maxDepth
                    ?   <button className={'toolbarButton summary flex items-center justify-center text-sm font-medium w-[80px]'}>Summary</button>
                    :   <button className={'toolbarButton showAll flex items-center justify-center text-sm font-medium w-[80px]'}>Show All</button>
                }
                <div className={'border-r-[1px]'}></div>
                <button className={'toolbarButton uppermost flex items-center justify-center w-[40px]'}>
                    <div><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></div>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
