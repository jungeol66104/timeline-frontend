import React from 'react';
import Image from "next/image";
import FirstPageSVG from "@/public/svg/firstPage.svg";
import NavigateBeforeSVG from "@/public/svg/NavigateBefore.svg";
import {
    selectIsToolbarDrag,
    selectToolbarStatus,
    updateIsTimelineInfo,
    updateIsToolbarDrag
} from "@/store/slices/appearanceSlice";
import HorizontalSplitSVG from "@/public/svg/horizontalSplit.svg";
import NavigateNextSVG from "@/public/svg/NavigateNext.svg";
import LastPageSVG from "@/public/svg/lastPage.svg";
import {useDispatch, useSelector} from "react-redux";

const ToolbarExpanded = () => {
    const dispatch = useDispatch()
    const toolbarStatus = useSelector(selectToolbarStatus)
    const isToolbarDrag = useSelector(selectIsToolbarDrag)

    const handleDragStart = (e: React.DragEvent) => {
        // const toolbarShrunk = document.querySelector('.toolbar-shrunk')
        // if (!toolbarShrunk) return
        //
        // e.dataTransfer.setDragImage(toolbarShrunk,20,20)
        // dispatch(updateIsToolbarDrag(true))
    }

    const handleDragEnd = () => {
        dispatch(updateIsToolbarDrag(false))
    }

    return (
        <div draggable onDragStart={(e) => handleDragStart(e)} onDragEnd={handleDragEnd} onDragEnter={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} className={`${isToolbarDrag ? 'opacity-0' : ''} ${toolbarStatus === "expand" ? 'bottom-[22px]' : 'bottom-[-25px]' } fixed left-1/2 transform -translate-x-1/2 flex items-center justify-center w-[168px] h-[40px] border-[1px] rounded-3xl bg-white drop-shadow-md`} style={{zIndex: 4999}}>
            <div className={'flex items-center'}>
                <button className={'px-[6px]'}><Image src={FirstPageSVG} alt={'last depth'} draggable={false} /></button>
                <button className={'px-[6px]'}><Image src={NavigateBeforeSVG} alt={'plus one depth'}  draggable={false}/></button>
                <div className={'mx-[6px] h-[24px] w-[0.1px] bg-gray-300'}></div>
                {/*<button onClick={() => dispatch(updateIsTimelineInfo())} className={'px-[7px] border-x-[1px]'}><Image src={HorizontalSplitSVG} alt={'timeline menu'}  draggable={false}/></button>*/}
                <button className={'px-[6px]'}><Image src={NavigateNextSVG} alt={'minus one depth'}  draggable={false}/></button>
                <button className={'px-[6px]'}><Image src={LastPageSVG} alt={'first depth'} draggable={false}/></button>
            </div>
        </div>
    );
};

export default ToolbarExpanded;
