import React from 'react';
import ContributionButton from "@/components/timelines/timelineModal/contributionButton";
import EditTimelineButton from "@/components/timelines/editTimelineButton";

const TimelineMenubar = () => {
    return (
        <div className={'w-full flex justify-between py-3'}>
            <ContributionButton/>
            <EditTimelineButton/>
        </div>
    );
};

export default TimelineMenubar;
