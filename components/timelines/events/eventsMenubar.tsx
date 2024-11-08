import React from 'react';
import AddEventButton from "@/components/timelines/events/addEventButton";
import KeynoteToggle from "@/components/timelines/events/keynoteToggle";
import EventCount from "@/components/timelines/events/eventCount";

const EventsMenubar = () => {
    return (
        <div className={'w-full flex justify-between'}>
            <AddEventButton type={'events'}/>
            <div className={'flex items-baseline gap-1.5'}>
                <EventCount/>
                <KeynoteToggle />
            </div>
        </div>
    );
};

export default EventsMenubar;
