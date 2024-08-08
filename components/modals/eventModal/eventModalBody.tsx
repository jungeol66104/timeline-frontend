import React from 'react';
import {useSelector} from "react-redux";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import EventView from "@/components/modals/eventModal/eventView/eventView";
import EventEdit from "@/components/modals/eventModal/eventEdit/eventEdit";
import EventHistory from "@/components/modals/eventModal/eventHistory/eventHistory";
import EventNew from "@/components/modals/eventModal/eventNew/eventNew";

const EventModalBody = () => {
    const contentType = useSelector(selectModalContentType)

    return (
        <div>
            {contentType === 'view' && <EventView />}
            {contentType === 'edit' && <EventEdit />}
            {contentType === 'history' && <EventHistory />}
            {contentType === 'new' && <EventNew />}
        </div>
    );
};

export default EventModalBody;
