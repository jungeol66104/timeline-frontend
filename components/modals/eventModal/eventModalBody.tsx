import React from 'react';
import {useSelector} from "react-redux";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import EventModalView from "@/components/modals/eventModal/eventView/eventModalView";
import EventModalEdit from "@/components/modals/eventModal/eventEdit/eventModalEdit";
import EventHistory from "@/components/modals/eventModal/eventHistory/eventHistory";
import EventModalNew from "@/components/modals/eventModal/eventNew/eventModalNew";

const EventModalBody = () => {
    const modalContentType = useSelector(selectModalContentType)

    return (
        <div>
            {modalContentType === 'view' && <EventModalView />}
            {modalContentType === 'edit' && <EventModalEdit />}
            {modalContentType === 'history' && <EventHistory />}
            {modalContentType === 'new' && <EventModalNew />}
        </div>
    );
};

export default EventModalBody;
