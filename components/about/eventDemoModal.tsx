import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import CloseModalButton from "@/components/modals/closeModalButton";
import EventModalHead from "@/components/modals/eventModal/eventModalHead";
import EventModalBody from "@/components/modals/eventModal/eventModalBody";
// reviewed: 0817

const EventDemoModal = () => {
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)

    const bottom = modalType === 'event' && timelineType === 'demo' ? 0 : '-100%'
    return (
        <div className={'eventModal absolute left-1/2 transform -translate-x-1/2 w-full max-w-lg h-full flex flex-col items-center bg-white rounded-t-2xl'} style={{zIndex: 3000, height: 'calc(100%)', bottom: bottom, transition: 'bottom 0.3s'}}>
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

export default EventDemoModal;
