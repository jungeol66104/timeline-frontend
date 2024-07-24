import React from 'react';
import ContributorsDropdown from "@/components/common/contributorsDropdown";
import TimelineContentTypeButton from "@/components/timelines/timelineHead/timelineContentTypeButton";
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import UsernameButton from "@/components/common/usernameButton";

const TimelineMenubar = () => {
    const timelineContentType = useSelector(selectTimelineContentType);

    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            {timelineContentType === 'new'
                ?   <UsernameButton />
                :   <ContributorsDropdown/>
            }
            {timelineContentType !== 'new' && <TimelineContentTypeButton />}
        </div>
    )
}
export default TimelineMenubar
