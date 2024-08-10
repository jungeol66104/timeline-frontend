import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import TimelineNameEdit from "@/components/timelines/timelineEdit/timelineNameEdit";
import TimelineDescriptionEdit from "@/components/timelines/timelineEdit/timelineDescriptionEdit";
import TimelineModalMenubar from "@/components/modals/timelineModal/timelineModalMenubar";

const TimelineModalHead = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const timelineContentType = useSelector(selectTimelineContentType)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const isTimelineEditable = timelineContentType === 'edit' || timelineContentType === 'new'

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {timelineContentType === 'new' || (timelineType === 'private' && timelineContentType === 'edit')
                    ?   <TimelineNameEdit />
                    :   <h1 className={`timelineInformationName w-fit flex items-center gap-2`}>
                            <span className={'text-2xl font-bold'}>{currentTimeline.name}</span>
                        </h1>
                }
                {isTimelineEditable
                    ?   <TimelineDescriptionEdit />
                    :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{timelineContentType === 'new' ? 'Created:' : 'Last Updated:'} January 14, 2024</div>
            <TimelineModalMenubar />
        </div>
    );
};
export default TimelineModalHead;