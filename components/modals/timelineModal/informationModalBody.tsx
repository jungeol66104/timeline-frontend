import React from 'react';
import {useSelector} from "react-redux";
import {selectInformationContentType} from "@/store/slices/appearanceSlice";
import InformationModalView from "@/components/modals/timelineModal/timelineModalView/informationModalView";
import TimelineModalEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineModalEdit";
import TimelineModalHistory from "@/components/modals/timelineModal/timelineModalHistory/timelineModalHistory";

const InformationModalBody = () => {
    const informationContentType = useSelector(selectInformationContentType)

    return (
        <div>
            {informationContentType === 'view' && <InformationModalView />}
            {informationContentType === 'edit' && <TimelineModalEdit />}
            {informationContentType === 'history' && <TimelineModalHistory />}
            {informationContentType === 'new' && <TimelineModalEdit />}
        </div>
    );
};

export default InformationModalBody;
