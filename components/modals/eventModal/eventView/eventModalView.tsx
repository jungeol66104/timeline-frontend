import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import EventModalImage from "@/components/modals/eventModal/eventView/eventModalImage";

const EventModalView = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div>
            <hr/>
            <div className={'w-full flex flex-col items-center'}>
                <EventModalImage event={currentEvent} />
                <p className={'mt-3 w-full'}>{currentEvent.content}</p>
            </div>
        </div>
    )
}
export default EventModalView
