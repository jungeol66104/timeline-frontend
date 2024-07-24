import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineModalView from "@/components/modal/timelineModal/timelineModalView";
import TimelineModalEdit from "@/components/modal/timelineModal/timelineModalEdit";
import InformationNew from "@/components/modal/timelineModal/informationNew";

const InformationModalBody = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div>
            {timelineContentType === 'view' && <TimelineModalView />}
            {timelineContentType === 'edit' && <TimelineModalEdit />}
            {timelineContentType === 'new' && <InformationNew />}
        </div>
    );
};

export default InformationModalBody;
