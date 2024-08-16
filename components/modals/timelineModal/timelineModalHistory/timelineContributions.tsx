import React from 'react';
import TimelineContribution from "@/components/common/contribution/timelineContribution";
import KeynoteContribution from "@/components/common/contribution/keynoteContribution";
import ConnectionContribution from "@/components/common/contribution/connectionContribution";

const TimelineContributions = () => {
    return (
        <div>
            <TimelineContribution type={'timeline'}/>
            <KeynoteContribution type={'timeline'}/>
            <ConnectionContribution type={'timeline'}/>
            <TimelineContribution type={'timeline'}/>
            <KeynoteContribution type={'timeline'}/>
            <ConnectionContribution type={'timeline'}/>
        </div>
    );
};

export default TimelineContributions;
