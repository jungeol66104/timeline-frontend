import React from 'react';
import {useSelector} from "react-redux";
import {selectModalType, selectTimelineType} from "@/store/slices/appearanceSlice";
import CloseModalButton from "@/components/modals/closeModalButton";
import InformationModalHead from "@/components/modals/informationModal/informationModalHead";
import InformationModalBody from "@/components/modals/informationModal/informationModalBody";

const InformationDemoModal = () => {
    const timelineType = useSelector(selectTimelineType)
    const modalType = useSelector(selectModalType)

    const bottom = modalType === 'information' && timelineType === 'demo' ? 0 : '-100%'
    return (
        <div className={'informationModal absolute w-full max-w-lg h-full left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex: 3000, height: 'calc(100%)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 w-full border-b-[1px] text-center'}>
                <h2 className={'text-md font-semibold'}>Information</h2>
                <CloseModalButton />
            </div>
            <div className={'p-4 w-full h-full flex flex-col gap-3 overflow-y-scroll'}>
                <InformationModalHead />
                <InformationModalBody />
            </div>
        </div>
    );
};

export default InformationDemoModal;
