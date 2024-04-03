import React from 'react';
import TimelineListPopular from "@/components/timeline/timelineListPopular";
import TimelineListRecentlyAdded from "@/components/timeline/timelineListRecentlyAdded";

const TimelineSectionSecondary = () => {
    return (
        <div className={'w-full max-w-[350px] ml-2 p-4'}>
            <hr/>
            <TimelineListPopular />
            <hr/>
            <TimelineListRecentlyAdded />
            <hr/>
        </div>
    );
};

export default TimelineSectionSecondary;
