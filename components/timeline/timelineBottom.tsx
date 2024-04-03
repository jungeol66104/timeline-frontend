import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const TimelineBottom = ({isEnd}:{isEnd: boolean}) => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'timelineEventsBottom h-[60px] w-full mt-2.5 flex justify-center items-center'} style={{zIndex: 4000}}>
            {isEnd
                ?   <div className={'ml-[22px] text-sm text-center italic pb-[16px]'}>
                        End of the Timeline<br/>
                        <b>{currentTimeline.name}</b>
                    </div>
                :   <></>
            }
        </div>
    );
};

export default TimelineBottom;
