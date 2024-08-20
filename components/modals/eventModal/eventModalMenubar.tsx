import React from "react";
import {useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";
import {selectDemoKeyConcept, selectEventContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import NicknameButton from "@/components/common/nicknameButton";
import ContributorsButton from "@/components/common/contributorsButton";
import EventViewEditButton from "@/components/modals/eventModal/eventViewEditButton";
import TemporaryHistoryButton from "@/components/common/temporaryHistoryButton";
import CreateEventButton from "@/components/modals/eventModal/createEventButton";
import {selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";

const EventModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const eventContentType = useSelector(selectEventContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const currentEvents = useSelector(selectCurrentEvents)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1


    return (
        <div className={'pt-3 w-full flex justify-between'}>
            <div className={'w-full flex gap-3'}>
                {timelineType === 'new' || timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')
                    ? <NicknameButton name={session.nickName || 'Nickname'}/>
                    : <ContributorsButton/>
                }
            </div>
            <div className={'flex gap-3'}>
                {eventContentType !== 'new' && <EventViewEditButton />}
                {eventContentType !== 'new' && timelineType === 'public' && <TemporaryHistoryButton />}
                {eventContentType === 'new' && !isCreated && <CreateEventButton/>}
            </div>
        </div>
    );
};

export default EventModalMenubar;
