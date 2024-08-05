import React from 'react';
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";

const TimelineDemo = () => {
    return (
        <div className={'w-full h-[500px] border-[1px] border-gray-300 rounded-2xl overflow-y-scroll'} style={{maxHeight: 'calc(100vh - 100px)'}}>
            <TimelineSectionPrimary />
        </div>
    );
};

export default TimelineDemo;
