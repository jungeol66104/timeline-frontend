import React from 'react';
import {selectToolbarStatus, updateIsTimelineInfo} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import HorizontalSplitSVG from "@/public/svg/horizontalSplit.svg";
import {useDispatch, useSelector} from "react-redux";

const ToolbarShrunk = () => {
    const dispatch = useDispatch()
    const toolbarStatus = useSelector(selectToolbarStatus)

    return (
        <button onClick={() => dispatch(updateIsTimelineInfo())} className={`shrunk ${toolbarStatus === "shrink" ? 'bottom-[25px]' : 'bottom-[-40px]' } fixed right-[12px] w-[40px] h-[40px] border-[1px] rounded-full bg-white drop-shadow-md flex items-center justify-center`} style={{zIndex: 4999}}><Image src={HorizontalSplitSVG} alt={'timeline menu'} draggable={false}/></button>
    );
};

export default ToolbarShrunk;
