import React from 'react';
import {useSelector} from "react-redux";
import {selectEventContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import EventDateEdit from "@/components/modals/eventModal/eventEdit/eventDateEdit";
import EventTitleEdit from "@/components/modals/eventModal/eventEdit/eventTitleEdit";
import EventModalMenubar from "@/components/modals/eventModal/eventModalMenubar";

const EventModalHead = () => {
    const currentEvent = useSelector(selectCurrentEvent)
    const eventContentType = useSelector(selectEventContentType)

    return (
        <div className={'z-20'}>
            <div className={'relative'}>
                {eventContentType === 'edit' || eventContentType === 'new'
                    ?   <EventDateEdit />
                    :   <div className={`w-fit text-md font-medium`}>{currentEvent.date}</div>
                }
                {eventContentType === 'edit' || eventContentType === 'new'
                    ?   <EventTitleEdit />
                    :   <h2 className={`w-fit text-2xl font-bold`}>{currentEvent.title}</h2>
                }
            </div>
            <EventModalMenubar/>
        </div>
    );
};

export default EventModalHead;
