import React from 'react'
import TimelineInformation from "@/components/timeline/timelineInformation";
import Timeline from "@/components/timeline/timeline";
import Toolbar from "@/components/timeline/toolbar";
// timelineInformation, timeline, toolbar, relatedTimelines

const sectionPrimary = () => {
    return (
        <div>
            <TimelineInformation />
            <hr/>
            <Timeline />
            <Toolbar />
        </div>
    );
};

export default sectionPrimary;
