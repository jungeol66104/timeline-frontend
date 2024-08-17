import React from 'react';
import {useSelector} from "react-redux";
import {selectInformationContentType} from "@/store/slices/appearanceSlice";
import TimelineModalView from "@/components/modals/timelineModal/timelineModalView/timelineModalView";
import TimelineModalEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineModalEdit";
import TimelineModalHistory from "@/components/modals/timelineModal/timelineModalHistory/timelineModalHistory";

const TimelineModalBody = () => {
    const informationContentType = useSelector(selectInformationContentType)

    return (
        <div>
            {informationContentType === 'view' && <TimelineModalView />}
            {informationContentType === 'edit' && <TimelineModalEdit />}
            {informationContentType === 'history' && <TimelineModalHistory />}
        </div>
    );
};

export default TimelineModalBody;
