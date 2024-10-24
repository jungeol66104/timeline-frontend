import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import MoveToTimelineButton from "@/components/modals/moveToTimelineButton";
import CloseModalButton from "@/components/modals/closeModalButton";
import InformationModalHead from "@/components/modals/informationModal/informationModalHead";
import InformationModalBody from "@/components/modals/informationModal/informationModalBody";
import ModalBottomBanners from "@/components/modals/modalBottomBanners";

const InformationModal = () => {
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)

    const bottom = modalType === 'information' && timelineType !== 'demo' ? 0 : '-100%'
    return (
        <div className={'informationModal fixed left-1/2 transform -translate-x-1/2 w-full max-w-lg flex flex-col items-center bg-white rounded-t-2xl'} style={{zIndex: 6000, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 w-full h-[44px] text-center border-b-[1px]'}>
                <MoveToTimelineButton />
                <h2 className={'text-md font-semibold'}>Information</h2>
                <CloseModalButton />
            </div>
            <div className={'modalScrollWrapper overflow-y-scroll'}>
                <div className={'p-3 w-full flex flex-col gap-3'}>
                    <InformationModalHead />
                    <InformationModalBody />
                    <ModalBottomBanners />
                </div>
            </div>
        </div>
    );
};

export default InformationModal;
