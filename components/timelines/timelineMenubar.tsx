import React from 'react';
import {useSelector} from "react-redux";
import ContributorsButton from "@/components/common/contributorsButton";
import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import {selectSession} from "@/store/slices/privateSlice";
import PublishButton from "@/components/timelines/publishButton";
import MoreButton from "@/components/common/more/moreButton";
import CreateTimelineButton from "@/components/layout/menu/createTimelineButton";

const TimelineMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'w-full flex justify-between'}>
            <div className={'flex items-center justify-center gap-3'}>
                {timelineType === 'public' && <ContributorsButton/>}
                {timelineType === 'private' || timelineType === 'new' && <NicknameButton name={'Nickname'} />}
                <div className={'text-gray-400 text-sm'}>Last Updated: August 15, 2024</div>
            </div>
            {timelineType === 'public' && <MoreButton />}
            {timelineType === 'private' && <PublishButton />}
            {timelineType === 'new' && <CreateTimelineButton />}
        </div>
    )
}

export default TimelineMenubar;
