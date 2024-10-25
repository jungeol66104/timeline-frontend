import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import EventView from "@/components/modals/eventModal/eventView/eventView";
import EventEdit from "@/components/modals/eventModal/eventEdit/eventEdit";
import EventHistory from "@/components/modals/eventModal/eventHistory/eventHistory";

const EventModalBody = () => {
    const eventContentType = useSelector(selectEventContentType)

    return (
        <div>
            {/*{eventContentType === 'view' && <EventView />}*/}
            {(eventContentType === 'edit' || eventContentType === 'view') && <EventEdit />}
            {eventContentType === 'history' && <EventHistory />}
            {eventContentType === 'new' && <EventEdit />}
        </div>
    );
};

export default EventModalBody;
