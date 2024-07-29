import React from 'react';
import CompareButton from "@/components/common/compareButton";
import EventContributions from "@/components/modal/eventModal/eventHistory/eventContributions";

const EventHistoryList = () => {
    return (
        <div>
            <div className={'pb-3'}><CompareButton/></div>
            <hr/>
            <EventContributions />
        </div>
    );
};

export default EventHistoryList;
