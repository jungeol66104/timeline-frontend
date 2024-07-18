import React from 'react';
import {formatDate} from "@/utils/global";
import ModalMenubar from "@/components/modal/modalMenubar";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import EventNameEdit from "@/components/modal/eventModal/eventNameEdit";
import EventDateEdit from "@/components/modal/eventModal/eventDateEdit";
import EraButton from "@/components/modal/eventModal/eraButton";

const EventModalHead = () => {
    const contentType = useSelector(selectModalContentType)
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'z-10'}>
            <div className={'relative'}>
                {contentType === 'edit'
                    ?   <div className={'flex gap-3'}><EventDateEdit /><EraButton/></div>
                    :   <div className={`w-fit text-md font-medium`}>{currentEvent.date}</div>
                }
            </div>
            <div className={'relative'}>
                {contentType === 'edit'
                    ?   <EventNameEdit />
                    :   <h1 className={`w-fit text-2xl font-bold`}>{currentEvent.name}</h1>
                }
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: {formatDate(currentEvent.updatedDT)}</div>
            <ModalMenubar/>
        </div>
    );
};

export default EventModalHead;
