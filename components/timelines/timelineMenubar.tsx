import React from 'react';
import {useSelector} from "react-redux";
import ContributorsButton from "@/components/common/contributorsButton";
import TimelineContentTypeButton from "@/components/timelines/timelineContentTypeButton";
import {selectDemoKeyConcept, selectTimelineContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import {selectSession} from "@/store/slices/privateSlice";
import TimelineEditToggleButton from "@/components/timelines/timelineEditToggleButton";
import PublishButton from "@/components/timelines/publishButton";

const TimelineMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const timelineContentType = useSelector(selectTimelineContentType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
            {timelineContentType === 'new' || timelineType === 'private' || (timelineType === 'demo' &&  demoKeyConcept === 'private')
                ?   <NicknameButton name={session.nickName || 'Nickname'}/>
                :   <ContributorsButton/>
            }
            {/*{timelineContentType !== 'new' && <TimelineContentTypeButton />}*/}
            {timelineContentType !== 'new'
                ?   timelineType === 'private' || timelineType === 'demo'
                    ?   <div className={'flex gap-3'}>
                            <PublishButton />
                            <TimelineEditToggleButton />
                        </div>
                    :   <TimelineContentTypeButton />
                :   <></>
            }
        </div>
    )
}
export default TimelineMenubar
