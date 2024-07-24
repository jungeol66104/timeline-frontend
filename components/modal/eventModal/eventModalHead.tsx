import React from 'react';
import {formatDate} from "@/utils/global";
import ModalMenubar from "@/components/modal/modalMenubar";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import EventNameEdit from "@/components/modal/eventModal/eventEdit/eventNameEdit";
import EventDateEdit from "@/components/modal/eventModal/eventEdit/eventDateEdit";
import EraButton from "@/components/modal/eventModal/eraButton";

const EventModalHead = () => {
    const currentEvent = useSelector(selectCurrentEvent)
    const contentType = useSelector(selectModalContentType)
    const isEventEditable = contentType === 'edit' || contentType === 'new'

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {isEventEditable
                    ?   <div className={'flex gap-1.5'}><EventDateEdit /><EraButton/></div>
                    :   <div className={`w-fit text-md font-medium`}>{currentEvent.date}</div>
                }
                {isEventEditable
                    ?   <EventNameEdit />
                    :   <h1 className={`w-fit text-2xl font-bold`}>{currentEvent.name}</h1>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>{contentType === 'new' ? 'Created:' : 'Last Updated:'}  January 14, 2024</div>
            <ModalMenubar/>
        </div>
    );
};

export default EventModalHead;
