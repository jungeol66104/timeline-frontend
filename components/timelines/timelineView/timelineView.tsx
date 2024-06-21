import React from 'react';
import RelatedTimelines from "@/components/timelines/timelineView/relatedTimelines";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/timelineView/toolbar";
import TimelineInformation from "@/components/timelines/timelineView/timelineInformation";

const TimelineView = () => {
    return (
        <>
            <hr className={'mt-3 mx-4'}/>
            <TimelineInformation/>
            <hr className={'mx-4'}/>
            <RelatedTimelines/>
            <hr className={'mx-4'}/>
            <Timeline/>
            <Toolbar/>
        </>
    );
};

export default TimelineView;
