import React, {useEffect, useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import NorthSVG from "@/public/svg/north.svg";
import {selectCurrentDepth, selectMaxDepth} from "@/store/slices/appearanceSlice";
import {getClickOrTouch} from "@/utils/global";
import {current} from "immer";

const Toolbar = () => {
    const maxDepth = useSelector(selectMaxDepth)
    const currentDepth = useSelector(selectCurrentDepth)

    useLayoutEffect(() => {
        const toolbar : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.toolbar') : null
        if (!toolbar) return

        if (getClickOrTouch() === 'touchend') {
            toolbar.style.right = '16px'
        }
    }, []);

    return (
        <div className={`fixed bottom-[18px] w-full max-w-[684px]`} style={{zIndex: 4998}}>
            <div className={'toolbar absolute bottom-0 flex border-[1px] rounded-lg bg-white/50 drop-shadow-md h-[40px]'} style={{right: 32}}>
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
