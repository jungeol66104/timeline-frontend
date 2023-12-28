import React from 'react';
import TimelineInfo from "@/components/timeline/timelineInfo";
import TimelineToolbar from "@/components/timeline/timelineToolbar";

const TimelineLayout = () => {
    return (
        <>
            <TimelineToolbar />
            <TimelineInfo />
        </>
    );
};

export default TimelineLayout;
