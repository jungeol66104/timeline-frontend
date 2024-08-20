import React from 'react';
import TimelineContribution from "@/components/common/contribution/timelineContribution";
import KeynoteContribution from "@/components/common/contribution/keynoteContribution";
import ConnectionContribution from "@/components/common/contribution/connectionContribution";

const InformationContributions = () => {
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

export default InformationContributions;
