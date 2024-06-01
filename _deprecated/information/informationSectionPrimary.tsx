import React from 'react'
import TimelineInformation from "@/components/timelines/timelineInformation";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/toolbar";
import RelatedTimelines from "@/components/timelines/relatedTimelines";
import RecentNews from "@/components/timelines/recentNews";
import Information from "@/_deprecated/information/information";

const InformationSectionPrimary = () => {
    return (
        <div className={'relative px-4 pt-4 pb-0 w-full min-[852px]:min-w-[500px] max-w-[630px]'}>
            <Information />
            <RelatedTimelines/>
        </div>
    )
}
export default InformationSectionPrimary;
