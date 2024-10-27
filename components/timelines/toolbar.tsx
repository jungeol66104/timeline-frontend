import React from 'react';
import {getScrollWrapper} from "@/utils/global";
import {useSelector} from "react-redux";
import {selectTimelineType} from "@/store/slices/appearanceSlice";
import AddEventButton from "@/components/timelines/events/addEventButton";

const Toolbar = () => {
    const timelineType = useSelector(selectTimelineType)

    const handleClick = () => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        scrollWrapper.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div className={`sticky bottom-0 ${timelineType === 'demo' && 'hidden'}`} style={{zIndex: 4998, width: 'calc(100%)'}}>
            <div className={'toolbar absolute right-0 bottom-[12px] flex gap-1.5'}>
                <AddEventButton type={'toolbar'}/>
                <button onClick={handleClick} className={'w-[40px] h-[40px] flex items-center justify-center border-[0.1px] border-gray-300 rounded-lg bg-white hover:bg-gray-100 drop-shadow-md'}>
                    <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf1e0;</div>
                </button>
            </div>
        </div>
    );
};
export default Toolbar;
