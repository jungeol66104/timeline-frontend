import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";

const Event = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'flex flex-col'}>
            <span className={'text-md font-semibold text-gray-500'}>{currentEvent.date}</span>
            <h1 className={'mt-1 text-2xl font-black'}>{currentEvent.name}</h1>
            <p className={'mt-2.5'}>{currentEvent.description}</p>
        </div>
    );
};

export default Event;
