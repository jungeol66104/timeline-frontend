import React from 'react';
import ModalMenubar from "@/components/modal/modalMenubar";
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const InformationModalHead = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div>
            <h1 className={'timelineInformationName text-2xl font-bold'}>{currentTimeline.name}</h1>
            <div className={'text-md'}>{currentTimeline.description}</div>
            <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Last Updated: January 14, 2024</div>
            <ModalMenubar/>
        </div>
    );
};
export default InformationModalHead;