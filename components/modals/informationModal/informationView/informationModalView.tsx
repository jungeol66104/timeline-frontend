import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/informationModal/informationView/informationModalImage";
import {unwrapPTag} from "@/utils/global";

const InformationModalView = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div>
            <hr/>
            <div className={'flex flex-col'}>
                <div className={'w-full flex items-center justify-center'}><InformationModalImage information={currentTimeline} /></div>
                <p className={'mt-3'}>{unwrapPTag(currentTimeline.content)}</p>
            </div>
        </div>
    );
};

export default InformationModalView;
