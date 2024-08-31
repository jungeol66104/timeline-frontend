import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectInformationContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import InformationModalMenubar from "@/components/modals/timelineModal/informationModalMenubar";
import InformationTitleEdit from "@/components/modals/timelineModal/timelineModalEdit/informationTitleEdit";
import InformationDescriptionEdit from "@/components/modals/timelineModal/timelineModalEdit/informationDescriptionEdit";

const InformationModalHead = () => {
    const timelineType = useSelector(selectTimelineType);
    const informationContentType = useSelector(selectInformationContentType)
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'z-20 w-full'}>
            <div className={'relative w-full'}>
                {informationContentType === 'new' || (timelineType === 'private' && informationContentType === 'edit') || (timelineType === 'demo' && informationContentType === 'edit')
                    ?   <InformationTitleEdit />
                    :   <h1 className={`w-full text-2xl font-bold`}>{currentTimeline.name}</h1>
                }
                {informationContentType === 'edit' || informationContentType === 'new'
                    ?   <InformationDescriptionEdit />
                    :   <div className={`w-fit text-md`}>{currentTimeline.description}</div>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{informationContentType === 'new' ? 'Created:' : 'Last Updated:'} January 14, 2024</div>
            <InformationModalMenubar />
        </div>
    );
};

export default InformationModalHead;
