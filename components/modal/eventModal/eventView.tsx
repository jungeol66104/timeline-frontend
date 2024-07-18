import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import ModalImage from "@/components/modal/modalImage";

const EventView = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div>
            <hr/>
            <div className={'flex flex-col items-center'}>
                <ModalImage src={currentEvent.image || 'https://cdn.timeline.vg/base-image.png'} alt={currentEvent.name} imageSize={currentEvent.imageSize}/>
                <p className={'mt-3'}>{currentEvent.description}</p>
            </div>
        </div>
    )
}
export default EventView
