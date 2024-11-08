import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvents} from "@/store/slices/contentsSlice";
import {selectIsKeynote} from "@/store/slices/appearanceSlice";

const EventCount = () => {
    const currentEvents = useSelector(selectCurrentEvents);
    const isKeynote = useSelector(selectIsKeynote)

    const [keynoteCount, setKeynoteCount] = useState(currentEvents.filter((event) => event.isKeynote === 1).length)

    useEffect(() => {
        setKeynoteCount(currentEvents.filter((event) => event.isKeynote === 1).length)
    }, [currentEvents, isKeynote]);

    return (
        <div className={'text-xs text-gray-600'}>
            <span className={`${isKeynote && 'text-blue-700 font-semibold'}`}>{isKeynote ? keynoteCount : currentEvents.length}</span>
            <span>/{currentEvents.length}</span>
        </div>
    );
};

export default EventCount;
