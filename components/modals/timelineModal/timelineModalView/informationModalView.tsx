import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import InformationModalImage from "@/components/modals/timelineModal/timelineModalView/informationModalImage";

const InformationModalView = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div>
            <hr/>
            <div className={'flex flex-col'}>
                <div className={'w-full flex items-center justify-center'}><InformationModalImage src={currentTimeline.image} alt={currentTimeline.name} imageSize={currentTimeline.imageSize} /></div>
                <p className={'mt-3'}>{currentTimeline.content}</p>
            </div>
        </div>
    );
};

export default InformationModalView;
