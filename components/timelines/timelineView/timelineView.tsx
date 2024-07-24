import React from 'react';
import RelatedTimelines from "@/components/timelines/timelineView/relatedTimelines";
import Timeline from "@/components/timelines/timeline/timeline";
import Toolbar from "@/components/timelines/toolbar";
import TimelineContent from "@/components/timelines/timelineView/timelineContent";

const TimelineView = () => {
    return (
        <div>
            <hr className={'mt-3 mx-4'}/>
            <TimelineContent/>
            <hr className={'mx-4'}/>
            <RelatedTimelines/>
            <hr className={'mx-4'}/>
            <Timeline/>
            <Toolbar/>
        </div>
    );
};

export default TimelineView;
