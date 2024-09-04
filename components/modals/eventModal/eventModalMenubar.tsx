import React from "react";
import {useSelector} from "react-redux";
import {selectSession} from "@/store/slices/privateSlice";
import {selectDemoKeyConcept, selectEventContentType, selectTimelineType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvent, selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";
import UsernameButton from "@/components/common/usernameButton";
import ContributorsButton from "@/components/common/contributorsButton";
import EventViewEditButton from "@/components/modals/eventModal/eventViewEditButton";
import HistoryButton from "@/components/modals/historyButton";
import CreateEventButton from "@/components/modals/eventModal/createEventButton";

const EventModalMenubar = () => {
    const session = useSelector(selectSession)
    const timelineType = useSelector(selectTimelineType);
    const eventContentType = useSelector(selectEventContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEvent = useSelector(selectCurrentEvent)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    return (
        <div className={'pt-3 w-full flex justify-between'}>
            <div className={'w-full flex gap-3'}>
                {timelineType === 'new' || timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')
                    ? <UsernameButton name={session.username}/>
                    : <ContributorsButton contributors={currentEvent.contributors}/>
                }
            </div>
            <div className={'flex gap-3'}>
                {eventContentType !== 'new' && <EventViewEditButton />}
                {eventContentType !== 'new' && timelineType === 'public' && <HistoryButton />}
                {eventContentType === 'new' && !isCreated && <CreateEventButton/>}
            </div>
        </div>
    );
};

export default EventModalMenubar;
