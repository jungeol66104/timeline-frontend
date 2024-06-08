import React from 'react'
import TimelineInformation from "@/components/timelines/timelineInformation/timelineInformation";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/toolbar";
import RelatedTimelines from "@/components/timelines/relatedTimelines";
import RecentNews from "@/components/timelines/recentNews";

const TimelineSectionPrimary = () => {
    return (
        <div className={'relative px-4 pt-4 pb-0 w-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <TimelineInformation />
            <RelatedTimelines />
            {/*<RecentNews />*/}
            <Timeline />
            <Toolbar />
        </div>
    )
}
export default TimelineSectionPrimary;
