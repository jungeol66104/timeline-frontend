import React from 'react';
import KeynoteContribution from "@/components/common/contributions/contribution/keynoteContribution";
import AttachmentContribution from "@/components/common/contributions/contribution/attachmentContribution";
import EventContribution from "@/components/common/contributions/contribution/eventContribution";

const EventContributions = () => {
    return (
        <div>
            <EventContribution type={'event'}/>
            <KeynoteContribution type={'event'}/>
            <AttachmentContribution type={'event'}/>
            <EventContribution type={'event'}/>
            <KeynoteContribution type={'event'}/>
            <AttachmentContribution type={'event'}/>
        </div>
    );
};

export default EventContributions;
