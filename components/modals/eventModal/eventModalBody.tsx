import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import EventView from "@/_deprecated/eventView";
import EventViewEdit from "@/components/modals/eventModal/eventViewEdit/eventViewEdit";
import EventHistory from "@/components/modals/eventModal/eventHistory/eventHistory";

const EventModalBody = () => {
    const eventContentType = useSelector(selectEventContentType)

    return (
        <div>
            {/*{eventContentType === 'view' && <EventView />}*/}
            {(eventContentType === 'edit' || eventContentType === 'view') && <EventViewEdit />}
            {eventContentType === 'history' && <EventHistory />}
            {eventContentType === 'new' && <EventViewEdit />}
        </div>
    );
};

export default EventModalBody;
