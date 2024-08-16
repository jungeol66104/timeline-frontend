import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import TimelineModalView from "@/components/modals/timelineModal/timelineModalView/timelineModalView";
import TimelineModalEdit from "@/components/modals/timelineModal/timelineModalEdit/timelineModalEdit";
import TimelineModalNew from "@/components/modals/timelineModal/timelineModalNew/timelineModalNew";
import TimelineModalHistory from "@/components/modals/timelineModal/timelineModalHistory/timelineModalHistory";

const TimelineModalBody = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div>
            {timelineContentType === 'view' && <TimelineModalView />}
            {timelineContentType === 'edit' && <TimelineModalEdit />}
            {timelineContentType === 'history' && <TimelineModalHistory />}
            {timelineContentType === 'new' && <TimelineModalNew />}
        </div>
    );
};

export default TimelineModalBody;
