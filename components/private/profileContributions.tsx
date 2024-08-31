import React from 'react';
import TimelineContribution from "@/components/common/contribution/timelineContribution";
import EventContribution from "@/components/common/contribution/eventContribution";
import ConnectionContribution from "@/components/common/contribution/connectionContribution";
import KeynoteContribution from "@/components/common/contribution/keynoteContribution";

const ProfileContributions = () => {
    return (
        <div className={'w-full'}>
            <TimelineContribution type={'profile'}/>
            <EventContribution type={'profile'}/>
            <ConnectionContribution type={'profile'}/>
            <KeynoteContribution type={'profile'}/>
            <TimelineContribution type={'profile'}/>
            <EventContribution type={'profile'}/>
            <ConnectionContribution type={'profile'}/>
            <KeynoteContribution type={'profile'}/>
        </div>
    );
};

export default ProfileContributions;
