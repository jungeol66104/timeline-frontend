import React from 'react';
import Contribution from "@/components/common/contribution/contribution";
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
            {/*{Array(10).fill(null).map((_, i) => {*/}
            {/*    return (*/}
            {/*        <Contribution key={i} />*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    );
};

export default TimelineContributions;
