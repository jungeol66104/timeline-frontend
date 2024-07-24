import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineNameEdit from "@/components/timelines/timelineHead/timelineNameEdit";
import TimelineDescriptionEdit from "@/components/timelines/timelineHead/timelineDescriptionEdit";
import TimelineMenubar from "@/components/timelines/timelineHead/timelineMenubar";

const InformationModalHead = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const timelineContentType = useSelector(selectTimelineContentType)
    const isTimelineEditable = timelineContentType === 'new'

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {isTimelineEditable
                    ?   <TimelineNameEdit />
                    :   <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                }
                {isTimelineEditable
                    ?   <TimelineDescriptionEdit />
                    :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
            <TimelineMenubar/>
        </div>
    );
};
export default InformationModalHead;