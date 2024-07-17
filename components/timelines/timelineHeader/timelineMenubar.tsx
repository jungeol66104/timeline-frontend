import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import TimelineContentTypeButton from "@/components/timelines/timelineHeader/timelineContentTypeButton";

const TimelineMenubar = () => {
    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            <ContributorsButton/>
            <TimelineContentTypeButton />
        </div>
    )
}
export default TimelineMenubar
