import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import EventModalView from "@/components/modals/eventModal/eventView/eventModalView";
import EventModalEdit from "@/components/modals/eventModal/eventEdit/eventModalEdit";
import EventHistory from "@/components/modals/eventModal/eventHistory/eventHistory";

const EventModalBody = () => {
    const eventContentType = useSelector(selectEventContentType)

    return (
        <div>
            {eventContentType === 'view' && <EventModalView />}
            {eventContentType === 'edit' && <EventModalEdit />}
            {eventContentType === 'history' && <EventHistory />}
            {eventContentType === 'new' && <EventModalEdit />}
        </div>
    );
};

export default EventModalBody;
