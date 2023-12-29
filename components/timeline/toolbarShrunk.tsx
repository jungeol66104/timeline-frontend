import React from 'react';
import {selectToolbarStatus, updateIsTimelineInfo} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import HorizontalSplitSVG from "@/public/svg/horizontalSplit.svg";
import {useDispatch, useSelector} from "react-redux";
import {z} from "zod";

const ToolbarShrunk = () => {
    const dispatch = useDispatch()
    const toolbarStatus = useSelector(selectToolbarStatus)

    let zIndex = toolbarStatus === "shrink" ? 4999 : -4999
    return (
        <button onClick={() => dispatch(updateIsTimelineInfo())} className={'toolbar-shrunk fixed bottom-[25px] right-[12px] w-[40px] h-[40px] border-[1px] rounded-full bg-white drop-shadow-md flex items-center justify-center'} style={{zIndex: zIndex}}><Image src={HorizontalSplitSVG} alt={'timeline menu'} draggable={false}/></button>
    );
};

export default ToolbarShrunk;
