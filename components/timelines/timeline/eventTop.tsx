import React from 'react';

const EventTop = ({isEnd} : {isEnd: boolean}) => {
    return (
        <div className={'timelineEventsTop flex items-center w-full'}>
            {isEnd
                ?   <div className={'h-1.5'}></div>
                :   <div className={'h-[60px]'}></div>
            }
        </div>
    );
};

export default EventTop;
