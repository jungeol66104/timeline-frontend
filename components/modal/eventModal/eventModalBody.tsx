import React from 'react';
import EventView from "@/components/modal/eventModal/eventView";
import EventEdit from "@/components/modal/eventModal/eventEdit";
import EventHistory from "@/components/modal/eventModal/eventHistory";
import {useSelector} from "react-redux";
import {selectModalContentType} from "@/store/slices/appearanceSlice";

const EventModalBody = () => {
    const contentType = useSelector(selectModalContentType)

    return (
        <div>
            {contentType === 'view'
                ?   <EventView />
                :   contentType === 'edit'
                    ?   <EventEdit />
                    :   <EventHistory />
            }
        </div>
    );
};

export default EventModalBody;
