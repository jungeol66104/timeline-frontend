import React from 'react';
import TimelineHeader from "@/components/timeline/timeilneHeader";

const TimelineTop = ({isEnd} : {isEnd: boolean}) => {
    return (
        <div className={'timelineEventsTop flex items-center h-[0px] w-full mb-1.5'} style={{zIndex: 4999}}>
            {/*{isEnd*/}
            {/*    ?   <TimelineHeader />*/}
            {/*    :   <></>*/}
            {/*}*/}
            {/*<div className={'h-[30px]'}></div>*/}
        </div>
    );
};

export default TimelineTop;
