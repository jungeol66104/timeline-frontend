import React from 'react';
import DiffButton from "@/components/modal/eventModal/diffButton";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";

const EventHistoryView = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <>
            <div className={'pb-3'}>
                <DiffButton />
            </div>
            <hr/>
            <div className={'pt-3'}>{currentEvent.description}</div>
        </>
    );
};

export default EventHistoryView;
