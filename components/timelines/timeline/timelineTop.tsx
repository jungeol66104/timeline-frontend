import React from 'react';

const TimelineTop = () => {
    return (
        <div className={'timelineEventsTop flex items-center w-full'}>
            <div className={'h-fit w-full bg-white'} style={{zIndex: 30}}>
                <h3 className={'text-[20px] py-3 font-bold'}>Timeline</h3>
            </div>
        </div>
    );
};

export default TimelineTop;
