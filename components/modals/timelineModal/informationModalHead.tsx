import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import InformationModalMenubar from "@/components/modals/timelineModal/informationModalMenubar";
import TimelineTitleEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineTitleEdit";
import TimelineDescriptionEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineDescriptionEdit";

const InformationModalHead = () => {
    const timelineType = useSelector(selectTimelineType);
    const informationContentType = useSelector(selectInformationContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept);
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {informationContentType === 'new' || (timelineType === 'private' && informationContentType === 'edit') || (timelineType === 'demo' && informationContentType === 'edit')
                    ?   <TimelineTitleEdit />
                    :   <h1 className={`w-fit flex items-center gap-2`}><span className={'text-2xl font-bold'}>{currentTimeline.name}</span></h1>
                }
                {informationContentType === 'edit' || informationContentType === 'new'
                    ?   <TimelineDescriptionEdit />
                    :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{informationContentType === 'new' ? 'Created:' : 'Last Updated:'} January 14, 2024</div>
            <InformationModalMenubar />
        </div>
    );
};

export default InformationModalHead;
