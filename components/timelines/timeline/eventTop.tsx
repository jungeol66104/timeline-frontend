import React from 'react';

const EventTop = ({isEnd} : {isEnd: boolean}) => {
    return (
        <div className={'timelineEventsTop flex items-center w-full'}>
            {isEnd
                ?   <div className={'h-fit w-full bg-white'} style={{zIndex: 5000}}>
                        <h3 className={'text-[20px] py-3 font-bold'}>Timeline</h3>
                    </div>
                :   <div className={'h-[60px]'}></div>
            }
        </div>
    );
};

export default EventTop;
