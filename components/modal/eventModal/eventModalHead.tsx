import React from 'react';
import {formatDate} from "@/utils/global";
import ModalMenubar from "@/components/modal/modalMenubar";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";

const EventModalHead = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'z-10'}>
            <span className={'text-md font-medium'}>{currentEvent.date}</span>
            <h1 className={'text-2xl font-bold'}>{currentEvent.name}</h1>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: {formatDate(currentEvent.updatedDT)}</div>
            <ModalMenubar/>
        </div>
    );
};

export default EventModalHead;
