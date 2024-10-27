import React from 'react';
import AddEventButton from "@/components/timelines/events/addEventButton";
import KeynoteToggle from "@/components/timelines/events/keynoteToggle";

const EventsMenubar = () => {
    return (
        <div className={'w-full flex justify-between'}>
            <AddEventButton type={'events'}/>
            <KeynoteToggle />
        </div>
    );
};

export default EventsMenubar;
