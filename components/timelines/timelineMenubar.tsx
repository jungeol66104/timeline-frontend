import React from 'react';
import {useSelector} from "react-redux";
import ContributorsButton from "@/components/common/contributorsButton";
import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import {selectSession} from "@/store/slices/privateSlice";
import TimelineViewEditButton from "@/components/timelines/timelineViewEditButton";
import PublishButton from "@/components/timelines/publishButton";
import MoreButton from "@/components/common/more/moreButton";
import TemporaryHistoryButton from "@/components/common/temporaryHistoryButton";

const TimelineMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const timelineContentType = useSelector(selectTimelineContentType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            {timelineContentType === 'new' || timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')
                ? <NicknameButton name={session.nickName || 'Nickname'}/>
                : <ContributorsButton/>
            }
            {timelineContentType !== 'new' &&
                <div className={'flex gap-3'}>
                    {timelineType === 'private' && <PublishButton />}
                    <TimelineViewEditButton/>
                    {/*{timelineType === 'public' && <MoreButton />}*/}
                    {timelineType === 'public' && <TemporaryHistoryButton />}
                </div>
            }
        </div>
    )
}
export default TimelineMenubar
