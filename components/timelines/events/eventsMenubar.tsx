import React from 'react';
import AddEventButton from "@/components/timelines/events/addEventButton";
import KeynoteButton from "@/components/timelines/events/keynoteButton";

const EventsMenubar = () => {
    return (
        <div className={'w-full flex justify-between'}>
            <AddEventButton />
            <KeynoteButton />
        </div>
    );
};

export default EventsMenubar;
