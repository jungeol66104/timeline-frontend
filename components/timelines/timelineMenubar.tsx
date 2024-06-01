import React from 'react';
import ContributionButton from "@/components/timelines/timelineModal/contributionButton";
import EditButton from "@/components/timelines/timelineModal/editButton";

const TimelineMenubar = () => {
    return (
        <div className={'w-full flex justify-between py-3'}>
            <ContributionButton/>
            <EditButton/>
        </div>
    );
};

export default TimelineMenubar;
