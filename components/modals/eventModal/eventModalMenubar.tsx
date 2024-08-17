import React from "react";
import {useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";
import {selectDemoKeyConcept, selectEventContentType, selectModalType, selectInformationContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import ContributorsButton from "@/components/common/contributorsButton";
import MoreButton from "@/components/common/more/moreButton";
import EventViewEditButton from "@/components/modals/eventModal/eventViewEditButton";
import TemporaryHistoryButton from "@/components/common/temporaryHistoryButton";

const EventModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineContentType = useSelector(selectInformationContentType);
    const modalContentType = useSelector(selectEventContentType)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={'mt-3 w-full flex justify-between z-10'}>
            <div className={'w-full flex gap-3'}>
                {timelineContentType === 'new' || timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')
                    ? <NicknameButton name={session.nickName || 'Nickname'}/>
                    : <ContributorsButton/>
                }
            </div>
            {modalContentType !== 'new' &&
                <div className={'flex gap-3'}>
                    <EventViewEditButton />
                    {/*{timelineType === 'public' && <MoreButton/>}*/}
                    {timelineType === 'public' && <TemporaryHistoryButton />}
                </div>
            }
        </div>
    );
};

export default EventModalMenubar;
