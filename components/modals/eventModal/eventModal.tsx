import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import MoveToTimelineButton from "@/components/modals/moveToTimelineButton";
import CloseModalButton from "@/components/modals/closeModalButton";
import EventModalHead from "@/components/modals/eventModal/eventModalHead";
import EventModalBody from "@/components/modals/eventModal/eventModalBody";
import ModalBottomBanners from "@/components/modals/modalBottomBanners";

const EventModal = () => {
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)

    const bottom = modalType === 'event' && timelineType !== 'demo' ? 0 : '-100%'
    return (
        <div className={'eventModal fixed left-1/2 transform -translate-x-1/2 w-full max-w-lg flex flex-col items-center bg-white rounded-t-2xl'} style={{zIndex: 5002, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 w-full h-[44px] text-center border-b-[1px]'}>
                <MoveToTimelineButton />
                <h2 className={'text-md font-semibold'}>Event</h2>
                <CloseModalButton />
            </div>
            <div className={'modalScrollWrapper overflow-y-scroll p-4 w-full h-full flex flex-col gap-3'}>
                <EventModalHead />
                <EventModalBody />
                <ModalBottomBanners />
            </div>
        </div>
    )
}

export default EventModal;
