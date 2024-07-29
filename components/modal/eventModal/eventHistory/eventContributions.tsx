import React from 'react';
import KeynoteContribution from "@/components/common/contribution/keynoteContribution";
import ConnectionContribution from "@/components/common/contribution/connectionContribution";
import EventContribution from "@/components/common/contribution/eventContribution";

const EventContributions = () => {
    return (
        <div>
            <EventContribution type={'event'}/>
            <KeynoteContribution type={'event'}/>
            <ConnectionContribution type={'event'}/>
            <EventContribution type={'event'}/>
            <KeynoteContribution type={'event'}/>
            <ConnectionContribution type={'event'}/>
        </div>
    );
};

export default EventContributions;
