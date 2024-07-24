import React from 'react';
import KeynoteDropdown from "@/components/timelines/timeline/keynoteDropdown";

const TimelineTop = () => {
    return (
        <div className={'timelineEventsTop w-full flex items-center'}>
            <div className={'h-fit w-full flex items-center justify-between bg-white z-30'}>
                <h3 className={'text-[20px] py-3 font-bold'}>Timeline</h3>
                <KeynoteDropdown />
            </div>
        </div>
    );
};

export default TimelineTop;
