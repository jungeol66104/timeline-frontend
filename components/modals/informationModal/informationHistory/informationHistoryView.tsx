import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelineView} from "@/store/slices/contentsSlice";
import DiffButton from "@/components/modals/eventModal/eventHistory/diffButton";

const InformationHistoryView = () => {
    const currentTimelineView = useSelector(selectCurrentTimelineView);

    return (
        <>
            <div className={'pb-3 flex justify-between'}>
                <span>Revision: </span>
                <DiffButton />
            </div>
            <hr/>
            {/*<div className={'pt-3'}>{currentEvent.content}</div>*/}
        </>
    );
};

export default InformationHistoryView;
