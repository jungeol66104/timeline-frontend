import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import EventViewEdit from "@/components/modals/eventModal/eventViewEdit/eventViewEdit";
import EventHistory from "@/components/modals/eventModal/eventHistory/eventHistory";

const EventModalBody = () => {
    const eventContentType = useSelector(selectEventContentType)

    return (
        <div>
            {(eventContentType === 'view' || eventContentType === 'edit' || eventContentType === 'new') && <EventViewEdit />}
            {eventContentType === 'history' && <EventHistory />}
        </div>
    );
};

export default EventModalBody;
