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
            <div className={'flex items-center justify-center gap-3'}>
                {eventContentType === 'new'
                    ?   <>
                            {timelineType === 'demo' && <UsernameButton user={{username: 'you', cdnUrl: 'https://cdn.timeline.vg/', imagePath: 'base-image.png'}} />}
                            {timelineType !== 'demo' && <UsernameButton user={session}/>}
                        </>
                    :   <>
                            {timelineType === 'public' && <ContributorsButton contributors={currentEvent.contributors!}/>}
                            {timelineType === 'private' && <UsernameButton user={session} />}
                            {timelineType === 'new' && <UsernameButton user={session} />}
                            {timelineType === 'demo' && demoKeyConcept !== 'private' && <ContributorsButton contributors={currentEvent.contributors!}/>}
                            {timelineType === 'demo' && demoKeyConcept === 'private' && <UsernameButton user={{username: 'you', cdnUrl: 'https://cdn.timeline.vg/', imagePath: 'base-image.png'}} />}
                        </>
                }
                {(timelineType === 'public' || timelineType === 'private') && eventContentType !== 'new' &&
                    <div className={'flex flex-col text-gray-400 text-xs'}>
                        <div>Last Updated:</div>
                        <div className={'max-[449.9px]:hidden'}>{currentEvent.updatedDT}</div>
                        <div className={'min-[450px]:hidden'}>{currentEvent.updatedDT?.split(' ')[0]}</div>
                    </div>
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
