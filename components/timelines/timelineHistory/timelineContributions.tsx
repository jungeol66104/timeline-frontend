import React from 'react';
import TimelineContribution from "@/components/common/contribution/timelineContribution";
import EventContribution from "@/components/common/contribution/EventContribution";
import KeynoteContribution from "@/components/common/contribution/keynoteContribution";
import ConnectionContribution from "@/components/common/contribution/connectionContribution";

const TimelineContributions = () => {
    return (
        <div className={'px-4'}>
            <TimelineContribution />
            <EventContribution />
            <KeynoteContribution />
            <ConnectionContribution />
        </div>
    );
};

export default TimelineContributions;
