import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Image from "next/image";
import NorthSVG from "@/public/svg/north.svg";
import {selectCurrentDepth, selectFooterHeight, selectMaxDepth} from "@/store/slices/appearanceSlice";

const Toolbar = () => {
    const maxDepth = useSelector(selectMaxDepth)
    const currentDepth = useSelector(selectCurrentDepth)

    return (
        <div className={`toolbar fixed bottom-[18px] flex items-center justify-end w-full max-w-[670px] px-4`} style={{zIndex: 4998}}>
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center h-[40px] rounded-3xl drop-shadow-md`}>
                <button className={`toolbarButton unfold pl-4 pr-2.5 border-l-[1px] border-t-[1px] border-b-[1px] h-full rounded-l-3xl shrink-0 text-sm font-semibold ${currentDepth === maxDepth ? 0 !== maxDepth ? 'bg-[#222222] shadow-black text-white shadow-inner' : 'bg-white/50' : 'bg-white'}`} style={{backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0))'}}>More</button>
                <button className={`toolbarButton fold pl-2.5 pr-4 border-r-[1px] border-t-[1px] border-b-[1px] h-full rounded-r-3xl shrink-0 text-sm font-semibold ${currentDepth === 0 ? 0 !== maxDepth ? 'bg-[#222222] shadow-black text-white shadow-inner' : 'bg-white/50' : 'bg-white'}`} style={{backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0))'}}>Less</button>
            </div>
            <div className={'flex items-center justify-center'}>
                <button className={'toolbarButton uppermost flex items-center justify-center w-[40px] h-[40px] border-[1px] rounded-3xl bg-white/50 drop-shadow-md'} style={{zIndex: 100}}>
                    <div><Image src={NorthSVG} alt={'uppermost'} height={20} width={20}/></div>
                </button>
            </div>
        </div>
    );
};

export default Toolbar;
