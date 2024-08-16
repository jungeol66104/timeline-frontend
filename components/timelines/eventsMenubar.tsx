import React from 'react';
import AddEventButton from "@/components/timelines/addEventButton";
import KeynoteButton from "@/components/timelines/keynoteButton";

const EventsMenubar = () => {
    return (
        <div className={'w-full flex justify-between'}>
            <AddEventButton />
            <KeynoteButton />
        </div>
    );
};

export default EventsMenubar;
