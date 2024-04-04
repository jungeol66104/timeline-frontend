import React, {useLayoutEffect, useState} from 'react';
import {getIsTouchable} from "@/utils/global";

const TimelineListRelated = () => {
    const [showTouchable, setShowTouchable] = useState(false)

    useLayoutEffect(() => {
        const isTouchable = getIsTouchable()
        if (isTouchable) setShowTouchable(true)
    }, []);

    return (
        <div className={'flex flex-col py-3'}>
            <h3 className={'text-[20px] font-bold mb-3'}>Related</h3>
            <div className={`flex gap-2 w-full ${showTouchable ? 'overflow-x-scroll hideScrollbar' : 'flex-wrap'}`}>
                <div className={'whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Saudi Arabia</div>
                <div className={'whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>King Saud University</div>
                <div className={'whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Neom City</div>
                <div className={'whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Saudi Aramco</div>
                <div className={'whitespace-nowrap py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Public Investment Fund</div>
            </div>
        </div>
    );
};

export default TimelineListRelated;
