import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import TimelineModalImage from "@/components/modals/timelineModal/timelineModalView/timelineModalImage";

const TimelineModalView = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div>
            <hr/>
            <div className={'flex flex-col items-center'}>
                <TimelineModalImage src={currentTimeline.image} alt={currentTimeline.name} imageSize={currentTimeline.imageSize} />
                <p className={'mt-3'}>{currentTimeline.content}</p>
            </div>
        </div>
    );
};

export default TimelineModalView;
