import React from 'react';
import {selectToolbarStatus, updateIsTimelineInfo} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import HorizontalSplitSVG from "@/public/svg/horizontalSplit.svg";
import {useDispatch, useSelector} from "react-redux";

const ToolbarShrunk = () => {
    const dispatch = useDispatch()
    const toolbarStatus = useSelector(selectToolbarStatus)
    //         <div className={`fixed left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[140px] h-[40px] border-[1px] rounded-3xl bg-white drop-shadow-md`} style={{zIndex: 4999}}>
    return (
        <button className={`shrunk ${toolbarStatus === "shrink" ? 'bottom-[22px]' : 'bottom-[-40px]' } fixed left-1/2 transform -translate-x-1/2 w-[55px] h-[25px] border-[1px] rounded-2xl bg-white drop-shadow-md opacity-80 text-sm font-semibold`} style={{zIndex: 4999}}>100%</button>
    );
};

export default ToolbarShrunk;
