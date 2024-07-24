import React from 'react';
import {useSelector} from "react-redux";
import {selectTimelineContentType} from "@/store/slices/appearanceSlice";
import InformationView from "@/components/modal/informationModal/informationView";
import InformationEdit from "@/components/modal/informationModal/informationEdit";
import InformationNew from "@/components/modal/informationModal/informationNew";

const InformationModalBody = () => {
    const timelineContentType = useSelector(selectTimelineContentType)

    return (
        <div>
            {timelineContentType === 'view' && <InformationView />}
            {timelineContentType === 'edit' && <InformationEdit />}
            {timelineContentType === 'new' && <InformationNew />}
        </div>
    );
};

export default InformationModalBody;
