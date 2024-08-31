import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelines} from "@/store/slices/contentsSlice";
import IndexBottom from "@/components/index/indexBottom";
import TimelinePreview from "@/components/index/timelinePreview";

const ProfileMyTimelines = () => {
    const currentTimelines = useSelector(selectCurrentTimelines)

    return (
        <div className={'w-full'}>
            {currentTimelines.map(timeline => {
                return <TimelinePreview key={timeline.id} timeline={timeline} />
            })}
            <IndexBottom/>
        </div>
    );
};

export default ProfileMyTimelines;
