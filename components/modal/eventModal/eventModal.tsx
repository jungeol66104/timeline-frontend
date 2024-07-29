import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType} from "@/store/slices/appearanceSlice";
import CloseModalButton from "@/components/modal/closeModalButton";
import EventModalHead from "@/components/modal/eventModal/eventModalHead";
import EventModalBody from "@/components/modal/eventModal/eventModalBody";

const EventModal = () => {
    const modalType = useSelector(selectModalType)

    const bottom = modalType === 'event' ? 0 : '-100%'
    return (
        <div className={'timelineModalEvent fixed left-1/2 transform -translate-x-1/2 w-full max-w-lg h-full flex flex-col items-center bg-white rounded-t-2xl'} style={{zIndex: 5002, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 w-full text-center border-b-[1px]'}>
                <h2 className={'text-md font-semibold'}>Event</h2>
                <CloseModalButton />
            </div>
            <div className={'p-4 w-full h-full flex flex-col gap-3 overflow-y-scroll z-10'}>
                <EventModalHead />
                <EventModalBody />
            </div>
        </div>
    )
}

export default EventModal;
