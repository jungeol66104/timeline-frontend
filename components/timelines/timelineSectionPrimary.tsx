import React from 'react'
import TimelineInformation from "@/components/timelines/information/timelineInformation";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/timeline/toolbar";
import RelatedTimelines from "@/components/timelines/relatedTimelines";
// timelineInformation, timeline, toolbar, relatedTimelines

const TimelineSectionPrimary = () => {
    return (
        <div className={'relative w-full max-w-[600px] p-4 max-[908px]:pb-0'}>
            <TimelineInformation />
            <RelatedTimelines />
            <Timeline />
            <Toolbar />
        </div>
    );
};

export default TimelineSectionPrimary;
