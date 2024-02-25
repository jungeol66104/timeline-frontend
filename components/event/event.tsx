import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";

const Event = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'flex flex-col'}>
            <span className={'text-md font-semibold'}>{currentEvent.date}</span>
            <h1 className={'text-2xl font-bold'}>{currentEvent.name}</h1>
            <div className={'mt-1 mb-1 flex gap-1 text-gray-500 font-medium text-sm'}>
                by
                <span>Timeline</span>
                ·
                <span>February 9, 2024</span>
            </div>
            <p className={'mt-[6px]'}>{currentEvent.description}</p>
        </div>
    );
};

export default Event;
