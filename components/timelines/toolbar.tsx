import React from 'react';
import {getScrollWrapper} from "@/utils/global";

const Toolbar = () => {

    const handleClick = () => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        scrollWrapper.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <div className={`sticky bottom-0`} style={{zIndex: 4998, width: 'calc(100% - 16px)'}}>
            <div className={'toolbar absolute right-0 bottom-[20px] flex border-[0.1px] border-gray-300 rounded-lg bg-white drop-shadow-md h-[40px] w-[40px]'}>
                <button onClick={handleClick} className={'flex items-center justify-center w-[40px]'}>
                    <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xf1e0;</div>
                </button>
            </div>
        </div>
    );
};
export default Toolbar;
