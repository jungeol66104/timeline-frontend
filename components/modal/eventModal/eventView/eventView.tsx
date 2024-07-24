import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import ModalEventImage from "@/components/modal/eventModal/modalEventImage";

const EventView = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div>
            <hr/>
            <div className={'w-full flex flex-col items-center'}>
                <ModalEventImage src={currentEvent.image || 'https://cdn.timeline.vg/base-image.png'} alt={currentEvent.name} imageSize={currentEvent.imageSize}/>
                <p className={'mt-3 w-full'}>{currentEvent.description}</p>
            </div>
        </div>
    )
}
export default EventView
