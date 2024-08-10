import React from 'react';
import CompareButton from "@/components/common/compareButton";
import EventContributions from "@/components/modals/eventModal/eventHistory/eventContributions";

const EventHistoryList = () => {
    return (
        <div>
            <div className={'pb-3 w-full flex justify-end'}><CompareButton/></div>
            <hr/>
            <EventContributions />
        </div>
    );
};

export default EventHistoryList;
