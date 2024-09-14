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
            <button onClick={() => handleClick('timeline')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'timeline' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Timeline</button>
            <button onClick={() => handleClick('information')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'information' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Information</button>
            <button onClick={() => handleClick('event')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'event' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Event</button>
            <button onClick={() => handleClick('edit')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'edit' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Edit</button>
            <button onClick={() => handleClick('contributors')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'contributors' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Contributors</button>
            <button onClick={() => handleClick('keynote')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'keynote' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Keynote</button>
            <button onClick={() => handleClick('private')} className={`relative z-20 h-[32px] w-fit shrink-0 px-3 flex items-center justify-center rounded-3xl border-[1px] ${demoKeyConcept === 'private' ? 'border-black' : 'border-gray-300'} bg-white text-sm font-semibold hover:bg-gray-100`}>Private</button>
        </div>
    );
};

export default KeyConceptBar;
