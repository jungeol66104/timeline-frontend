import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectSession} from "@/store/slices/privateSlice";
import {formatDate, getTodayDate} from "@/utils/global";
import ContributorsButton from "@/components/common/contributorsButton";
import UsernameButton from "@/components/common/usernameButton";
import TimelineMoreButton from "@/components/timelines/menubar/timelineMoreButton";
import PublishButton from "@/components/timelines/menubar/publishButton";
import CreateTimelineButton from "@/components/timelines/menubar/createTimelineButton";

const TimelineMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'z-10 w-full flex justify-between'}>
            <div className={'flex items-center justify-center gap-3'}>
                {timelineType === 'public' && <ContributorsButton contributors={currentTimeline.contributors!}/>}
                {timelineType === 'private' && <UsernameButton user={session} />}
                {timelineType === 'new' && <UsernameButton user={session} />}
                {timelineType === 'demo' && demoKeyConcept !== 'private' && <ContributorsButton contributors={currentTimeline.contributors!}/>}
                {timelineType === 'demo' && demoKeyConcept === 'private' && <UsernameButton user={{username: 'you', cdnUrl: 'https://cdn.timeline.vg/', imagePath: 'base-image.png'}} />}
                <div className={'text-gray-400 text-sm'}>{timelineType === 'new' ? `Created: ${formatDate(getTodayDate())}` : `Last Updated: ${<div>${currentTimeline.updatedDT}</div>}`}</div>
            </div>
            <div className={'ml-3'}>
                {timelineType === 'public' && <TimelineMoreButton />}
                {timelineType === 'private' && <PublishButton />}
                {timelineType === 'new' && <CreateTimelineButton />}
                {timelineType === 'demo' && demoKeyConcept === 'private' && <PublishButton />}
            </div>
        </div>
    )
}

export default TimelineMenubar;
