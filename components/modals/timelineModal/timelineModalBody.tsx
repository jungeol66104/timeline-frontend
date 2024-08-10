import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineModalView from "@/components/modals/timelineModal/timelineModalView/timelineModalView";
import TimelineModalEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineModalEdit";
import TimelineModalNew from "@/components/modals/timelineModal/timelineModalNew/timelineModalNew";

const TimelineModalBody = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div>
            {timelineContentType === 'view' && <TimelineModalView />}
            {timelineContentType === 'edit' && <TimelineModalEdit />}
            {timelineContentType === 'new' && <TimelineModalNew />}
        </div>
    );
};

export default TimelineModalBody;
