import React from 'react';
import ModalMenubar from "@/components/modal/modalMenubar";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectModalContentType} from "@/store/slices/appearanceSlice";
import InformationDescriptionEdit from "@/components/modal/informationModal/informationDescriptionEdit";

const InformationModalHead = () => {
    const contentType = useSelector(selectModalContentType)
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'z-10'}>
            <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
            <div className={'relative'}>
                {contentType === 'edit' &&  <InformationDescriptionEdit />}
                <div className={`${contentType === 'edit' && 'invisible'} text-md`}>{currentTimeline.description}</div>
            </div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
            <ModalMenubar/>
        </div>
    );
};
export default InformationModalHead;