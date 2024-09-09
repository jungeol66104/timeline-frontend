import React from 'react';
import TimelineContribution from "@/components/common/contributions/contribution/timelineContribution";
import KeynoteContribution from "@/components/common/contributions/contribution/keynoteContribution";
import AttachmentContribution from "@/components/common/contributions/contribution/attachmentContribution";

const InformationContributions = () => {
    return (
        <div>
            <TimelineContribution type={'timeline'}/>
            <KeynoteContribution type={'timeline'}/>
            <AttachmentContribution type={'timeline'}/>
            <TimelineContribution type={'timeline'}/>
            <KeynoteContribution type={'timeline'}/>
            <AttachmentContribution type={'timeline'}/>
        </div>
    );
};

export default InformationContributions;
