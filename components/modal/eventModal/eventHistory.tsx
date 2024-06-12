import React from 'react';
import HistoryCompareButton from "@/components/modal/eventModal/historyCompareButton";

const EventHistory = () => {
    return (
        <div className={'flex flex-col gap-3'}>
            <div>
                <HistoryCompareButton />
            </div>
            <hr/>
            <p>history list</p>
        </div>
    );
};

export default EventHistory;
