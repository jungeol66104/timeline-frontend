import React from 'react';
import TimelineListPopular from "@/components/timeline/timelineListPopular";
import TimelineListTrending from "@/components/timeline/timelineListTrending";

const TimelineSectionSecondary = () => {
    return (
        <div className={'w-full max-w-[350px] ml-2 p-4'}>
            <hr/>
            <TimelineListPopular />
            <hr/>
            <TimelineListTrending />
            <hr/>
        </div>
    );
};

export default TimelineSectionSecondary;
