import React from 'react';
import {useSelector} from "react-redux";
import {selectIsToolbarDrag, selectToolbarStatus, updateIsTimelineInfo} from "@/store/slices/appearanceSlice";
import ToolbarExpanded from "@/components/timelineLayout/toolbarExpanded";
import ToolbarShrunk from "@/components/timelineLayout/toolbarShrunk";
import Image from "next/image";
import HorizontalSplitSVG from "@/public/svg/horizontalSplit.svg";
// refactoring: clear

const TimelineToolbar = () => {
    const toolbarStatus = useSelector(selectToolbarStatus)
    const isToolbarDrag = useSelector(selectIsToolbarDrag)

    return (
        <>
            {isToolbarDrag
                ? <div onDragEnter={(e) => e.preventDefault()} onDragOver={(e) => e.preventDefault()} className={'fixed left-0 top-0 w-full h-full'} style={{zIndex: 4998}}></div>
                : <></>
            }
            <ToolbarExpanded />
            <ToolbarShrunk />
            {isToolbarDrag && toolbarStatus === "expand" && <div className={'fixed bottom-[25px] right-[12px] w-[40px] h-[40px] border-[1px] rounded-full bg-black opacity-20 drop-shadow-md'} style={{zIndex: 4999}}></div>}
            {isToolbarDrag && toolbarStatus === "shrink" && <div className={'fixed bottom-[25px] left-1/2 transform -translate-x-1/2 w-[200px] h-[40px] border-[1px] rounded-3xl bg-black opacity-20 drop-shadow-md'} style={{zIndex: 4999}}></div>}
        </>
    );
};
export default TimelineToolbar;
