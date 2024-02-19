import React from 'react';
import TimelineHeader from "@/components/timeline/timeilneHeader";

const TimelineEventsTop = ({isEnd} : {isEnd: boolean}) => {
    return (
        <div className={'timelineEventsTop flex items-center bg-white h-[60px] w-full mb-2.5'} style={{zIndex: 4999}}>
            {isEnd
                ?   <TimelineHeader />
                :
                <div>
                    <div className={'bg-white h-full border-[0.1px] border-gray-300 rounded-xl shadow-md p-2.5'}></div>
                </div>
            }
        </div>
    );
};

export default TimelineEventsTop;
