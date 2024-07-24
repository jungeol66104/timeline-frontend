import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import TimelineContentTypeButton from "@/components/timelines/timelineContentTypeButton";
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import UsernameButton from "@/components/common/usernameButton";

const TimelineMenubar = () => {
    const timelineContentType = useSelector(selectTimelineContentType);

    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            {timelineContentType === 'new'
                ?   <UsernameButton />
                :   <ContributorsButton/>
            }
            {timelineContentType !== 'new' && <TimelineContentTypeButton />}
        </div>
    )
}
export default TimelineMenubar
