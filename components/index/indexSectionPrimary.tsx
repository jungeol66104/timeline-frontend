import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelines} from "@/store/slices/contentsSlice";
import TimelinePreview from "@/components/index/timelinePreview";
import IndexBottom from "@/components/index/indexBottom";

const IndexSectionPrimary = () => {
    const currentTimelines = useSelector(selectCurrentTimelines)

    return (
        <div className={'relative px-4 pt-1 pb-0 h-fit w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
            {currentTimelines.map(timeline => {
                return <TimelinePreview key={timeline.id} timeline={timeline} />
            })}
            <IndexBottom/>
        </div>
    );
};

export default IndexSectionPrimary;
