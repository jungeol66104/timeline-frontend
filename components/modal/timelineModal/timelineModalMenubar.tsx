import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import ContributorsButton from "@/components/common/contributorsButton";
import UsernameButton from "@/components/common/usernameButton";
import {selectSession} from "@/store/slices/privateSlice";

const TimelineModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineContentType = useSelector(selectTimelineContentType);

    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            {timelineContentType === 'new'
                ?   <UsernameButton name={session.nickName || 'nickName'}/>
                :   <ContributorsButton/>
            }
        </div>
    )
}
export default TimelineModalMenubar
