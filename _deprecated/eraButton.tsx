import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";

const EraButton = () => {
    const dispatch = useDispatch();
    const currentEventDraft = useSelector(selectCurrentEvent)
    const isCE = !currentEventDraft.date.endsWith('BCE')

    const handleClick = (era: string) => {
        let date;
        if (era === 'BCE') {
            if (!isCE) return
            date = currentEventDraft.date + ' BCE'
        } else {
            if (isCE) return
            date = currentEventDraft.date.slice(0, -4)
        }
        dispatch(updateCurrentEventDraft({...currentEventDraft, date: date}))
    }

    return (
        <div className={`py-[1px] px-[2px] h-[24px] flex items-center gap-[1px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-sm`}>
            <button onClick={() => handleClick('BCE')} className={`px-1 h-[20px] text-xs rounded-sm ${!isCE ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>BCE</button>
            <button onClick={() => handleClick('CE')} className={`px-1 h-[20px] text-xs rounded-sm ${isCE ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>CE</button>
        </div>
    );
};

export default EraButton;
