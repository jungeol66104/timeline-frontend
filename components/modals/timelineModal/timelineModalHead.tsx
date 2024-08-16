import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import TimelineModalMenubar from "@/components/modals/timelineModal/timelineModalMenubar";
import TimelineNameEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineNameEdit";
import TimelineDescriptionEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineDescriptionEdit";

const TimelineModalHead = () => {
    const timelineType = useSelector(selectTimelineType);
    const timelineContentType = useSelector(selectTimelineContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept);
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {timelineType === 'new' || (timelineType === 'private' && timelineContentType === 'edit')
                    ?   <TimelineNameEdit />
                    :   <h1 className={`w-fit flex items-center gap-2`}><span className={'text-2xl font-bold'}>{currentTimeline.name}</span></h1>
                }
                {timelineType === 'new' || timelineContentType === 'edit'
                    ?   <TimelineDescriptionEdit />
                    :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{timelineType === 'new' ? 'Created:' : 'Last Updated:'} January 14, 2024</div>
            <TimelineModalMenubar />
        </div>
    );
};

export default TimelineModalHead;
