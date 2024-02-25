import React from 'react';
import TimelineHeader from "@/components/timeline/timeilneHeader";

const TimelineEventsTop = ({isEnd} : {isEnd: boolean}) => {
    return (
        <div className={'timelineEventsTop flex items-center h-[60px] w-full mb-1.5'} style={{zIndex: 4999}}>
            {isEnd
                ?   <TimelineHeader />
                :   <></>
            }
        </div>
    );
};

export default TimelineEventsTop;
