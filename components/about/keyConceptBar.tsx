import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, updateDemoKeyConcept} from "@/store/slices/appearanceSlice";

const KeyConceptBar = () => {
    const dispatch = useDispatch()
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    const handleClick = (keyConcept: string) => {
        dispatch(updateDemoKeyConcept(keyConcept))
    }

    return (
        <div className={'flex gap-2 flex-wrap'}>
            <button onClick={() => handleClick('timeline')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Timeline</button>
            <button onClick={() => handleClick('')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Event</button>
            <button onClick={() => handleClick('')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Show More</button>
            <button onClick={() => handleClick('')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Edit</button>
            <button onClick={() => handleClick('')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Contributors</button>
            <button onClick={() => handleClick('')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Keynote</button>
            <button onClick={() => handleClick('')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-300 bg-white text-sm font-semibold hover:bg-gray-100`}>Private</button>
        </div>
    );
};

export default KeyConceptBar;
