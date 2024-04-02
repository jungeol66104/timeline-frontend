import React from 'react'
import TimelineInformation from "@/components/timeline/timelineInformation";
import Timeline from "@/components/timeline/timeline";
import Toolbar from "@/components/timeline/toolbar";
import TimelineListRelated from "@/components/timeline/timelineListRelated";
// timelineInformation, timeline, toolbar, relatedTimelines

const timelineSectionPrimary = () => {
    return (
        <div className={'w-full max-w-[650px] p-4 '}>
            <TimelineInformation />
            <hr/>
            {/*<TimelineListRelated />*/}
            {/*<hr/>*/}
            <Timeline />
            <Toolbar />
        </div>
    );
};

export default timelineSectionPrimary;
