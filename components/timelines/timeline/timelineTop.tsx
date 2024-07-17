import React from 'react';
import KeynoteButton from "@/components/timelines/timeline/keynoteButton";

const TimelineTop = () => {
    return (
        <div className={'timelineEventsTop flex items-center w-full'}>
            <div className={'h-fit w-full flex items-center justify-between bg-white'} style={{zIndex: 30}}>
                <h3 className={'text-[20px] py-3 font-bold'}>Timeline</h3>
                <KeynoteButton />
            </div>
        </div>
    );
};

export default TimelineTop;
