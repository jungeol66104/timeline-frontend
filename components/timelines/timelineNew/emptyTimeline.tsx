import React from 'react';
import AddEventButton from "@/components/timelines/timelineEdit/addEventButton";

const EmptyTimeline = () => {
    return (
        <div className='timeline relative py-10 px-4 w-full flex flex-col items-center justify-center gap-5'>
            <div className={'text-center'}>
                <h2 className={'text-xl font-semibold'}>Start Timelining</h2>
                <div>Create your first event for the timeline.</div>
            </div>
            <AddEventButton />
        </div>
    );
};

export default EmptyTimeline;
