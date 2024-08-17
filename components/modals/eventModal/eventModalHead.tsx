import React from 'react';
import EventModalMenubar from "@/components/modals/eventModal/eventModalMenubar";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import EventNameEdit from "@/components/modals/eventModal/eventEdit/eventNameEdit";
import EventDateEdit from "@/components/modals/eventModal/eventEdit/eventDateEdit";

const EventModalHead = () => {
    const currentEvent = useSelector(selectCurrentEvent)
    const contentType = useSelector(selectEventContentType)
    const isEventEditable = contentType === 'edit' || contentType === 'new'

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {isEventEditable
                    ?   <EventDateEdit />
                    :   <div className={`w-fit text-md font-medium`}>{currentEvent.date}</div>
                }
                {isEventEditable
                    ?   <EventNameEdit />
                    :   <h1 className={`w-fit text-2xl font-bold`}>{currentEvent.name}</h1>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{contentType === 'new' ? 'Created:' : 'Last Updated:'}  January 14, 2024</div>
            <EventModalMenubar/>
        </div>
    );
};

export default EventModalHead;
