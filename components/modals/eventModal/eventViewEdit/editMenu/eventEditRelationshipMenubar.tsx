import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents} from "@/store/slices/contentsSlice";
import KeynoteButton from "@/components/modals/eventModal/eventViewEdit/editMenu/keynoteButton";
import DetachButton from "@/components/modals/eventModal/eventViewEdit/editMenu/detachButton";

const EventEditRelationshipMenubar = () => {
    const contentType = useSelector(selectEventContentType)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const isCreated = currentEvents.findIndex((event) => event.id === currentEventDraft.id) !== -1

    return (
        <div className={'p-0.5 flex items-center gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md'}>
            <KeynoteButton/>
            <button className={`px-2.5 h-8 text-sm rounded-md hover:bg-gray-100 font-semibold`}>Links</button>
            {(contentType === 'edit' || (contentType === 'new' && isCreated)) && <DetachButton/>}
        </div>
    );
};

export default EventEditRelationshipMenubar;
