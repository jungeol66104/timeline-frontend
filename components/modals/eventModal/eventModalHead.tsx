import React from 'react';
import {useSelector} from "react-redux";
import EventModalMenubar from "@/components/modals/eventModal/eventModalMenubar";
import EventNameEdit from "@/components/modals/eventModal/eventEdit/eventNameEdit";
import EventDateEdit from "@/components/modals/eventModal/eventEdit/eventDateEdit";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectEventContentType} from "@/store/slices/appearanceSlice";

const EventModalHead = () => {
    const currentEvent = useSelector(selectCurrentEvent)
    const eventContentType = useSelector(selectEventContentType)

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {eventContentType === 'edit' || eventContentType === 'new'
                    ?   <EventDateEdit />
                    :   <div className={`w-fit text-md font-medium`}>{currentEvent.date}</div>
                }
                {eventContentType === 'edit' || eventContentType === 'new'
                    ?   <EventNameEdit />
                    :   <h1 className={`w-fit text-2xl font-bold`}>{currentEvent.name}</h1>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{eventContentType === 'new' ? 'Created' : 'Last Updated'}: August 14, 2024</div>
            <EventModalMenubar/>
        </div>
    );
};

export default EventModalHead;
