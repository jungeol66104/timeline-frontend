import React from 'react';
import {useSelector} from "react-redux";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import EventView from "@/components/modal/eventModal/eventView/eventView";
import EventEdit from "@/components/modal/eventModal/eventEdit/eventEdit";
import EventHistory from "@/components/modal/eventModal/eventHistory/eventHistory";
import EventNew from "@/components/modal/eventModal/eventNew/eventNew";

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
