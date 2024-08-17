import React from 'react';
import {useSelector} from "react-redux";
import ContributorsButton from "@/components/common/contributorsButton";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import {selectSession} from "@/store/slices/privateSlice";
import PublishButton from "@/components/timelines/menubar/publishButton";
import CreateTimelineButton from "@/components/timelines/menubar/createTimelineButton";
import TimelineMoreButton from "@/components/timelines/menubar/timelineMoreButton";

const TimelineMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'z-10 w-full flex justify-between'}>
            <div className={'flex items-center justify-center gap-3'}>
                {(timelineType === 'private' || timelineType === 'new' || (timelineType === 'demo' && demoKeyConcept === 'private'))
                    ?   <NicknameButton name={'Nickname'} />
                    :   <ContributorsButton/>
                }
                <div className={'text-gray-400 text-sm'}>{timelineType === 'new' ? 'Created' : 'Last Updated'}: August 15, 2024</div>
            </div>
            {timelineType === 'public' && <TimelineMoreButton />}
            {(timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')) && <PublishButton />}
            {timelineType === 'new' && <CreateTimelineButton />}
        </div>
    )
}

export default TimelineMenubar;
