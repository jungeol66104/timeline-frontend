import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import ContributorsButton from "@/components/common/contributorsButton";
import NicknameButton from "@/components/common/nicknameButton";
import {selectSession} from "@/store/slices/privateSlice";
import TimelineViewEditButton from "@/components/modals/timelineModal/timelineViewEditButton";
import MoreButton from "@/components/common/more/moreButton";
import TemporaryHistoryButton from "@/components/common/temporaryHistoryButton";

const TimelineModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const timelineContentType = useSelector(selectInformationContentType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'pt-3 w-full flex justify-between'}>
            {timelineType === 'new' || timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')
                ? <NicknameButton name={session.nickName || 'Nickname'}/>
                : <ContributorsButton/>
            }
            {timelineContentType !== 'new' &&
                <div className={'flex gap-3'}>
                    {timelineType !== 'new' && <TimelineViewEditButton/>}
                    {/*{timelineType === 'public' && <MoreButton />}*/}
                    {timelineType === 'public' && <TemporaryHistoryButton />}
                </div>
            }
        </div>
    )
}
export default TimelineModalMenubar
