import React from 'react'
import TimelineInformation from "@/components/timelines/information/timelineInformation";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/timeline/toolbar";
import RelatedTimelines from "@/components/timelines/relatedTimelines";
import RecentNews from "@/components/timelines/recentNews";
// timelineInformation, timeline, toolbar, relatedTimelines

const TimelineSectionPrimary = () => {
    return (
        <div className={'relative h-fit w-full max-w-[600px] px-4 pt-4 pb-0'}>
            <TimelineInformation />
            <RelatedTimelines />
            <RecentNews />
            <Timeline />
            <Toolbar />
        </div>
    )
}
export default TimelineSectionPrimary;
