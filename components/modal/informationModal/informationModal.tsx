import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectModalContentType, selectModalType} from "@/store/slices/appearanceSlice";
import InformationEdit from "@/components/modal/informationModal/informationEdit";
import InformationView from "@/components/modal/informationModal/informationView";
import CloseModalButton from "@/components/modal/closeModalButton";
import PrimaryMenubar from "@/components/common/primaryMenubar";

const InformationModal = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const modalType = useSelector(selectModalType)
    const contentType = useSelector(selectModalContentType)

    const bottom = modalType === 'information' ? 0 : '-100%'
    return (
        <div className={'timelineModalInformation fixed w-full max-w-lg h-full left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex: 5002, height: 'calc(100% - 61px)', bottom: bottom, transition: 'bottom 0.3s'}}>
            <div className={'relative py-2.5 border-b-[1px] w-full text-center'}>
                <h2 className={'font-semibold text-md'}>Information</h2>
                <CloseModalButton />
            </div>

            <div className={'p-4 w-full h-full overflow-y-scroll'}>
                <div className={'pb-3 w-full flex flex-col gap-3'}>
                    <div>
                        <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
                        <div className={'text-md'}>{currentTimeline.description}</div>
                        <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
                    </div>
                    <PrimaryMenubar />
                    {contentType === 'view'
                        ?   <InformationView />
                        :   contentType === 'edit'
                            ?   <InformationEdit />
                            :   <></>
                    }
                </div>
            </div>
        </div>

    );
};
export default InformationModal;
