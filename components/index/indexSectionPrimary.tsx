import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimelines} from "@/store/slices/contentsSlice";
import TimelinePreview from "@/components/index/timelinePreview";
import IndexBottom from "@/components/index/indexBottom";
import {selectTagNum} from "@/store/slices/appearanceSlice";

const IndexSectionPrimary = () => {
    const currentTimelines = useSelector(selectCurrentTimelines)
    const tagNum = useSelector(selectTagNum)

    let timelines = [...currentTimelines]
    if (tagNum === 4) {
        timelines.sort((a, b) => {
            if (a.title === 'BTS') return -1;
            if (b.title === 'BTS') return 1;
            return 0;
        });
    }

    return (
        <div className={'relative px-4 pt-1 pb-0 h-fit w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
            {timelines.map(timeline => {
                return <TimelinePreview key={timeline.id} timeline={timeline} />
            })}
            <IndexBottom/>
        </div>
    );
};

export default IndexSectionPrimary;
