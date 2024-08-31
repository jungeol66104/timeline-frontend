import React from 'react';
import {useSelector} from "react-redux";
import {selectInformationContentType} from "@/store/slices/appearanceSlice";
import InformationModalView from "@/components/modals/timelineModal/timelineModalView/informationModalView";
import InformationModalEdit from "@/components/modals/timelineModal/timelineModalEdit/informationModalEdit";
import InformationModalHistory from "@/components/modals/timelineModal/timelineModalHistory/informationModalHistory";

const InformationModalBody = () => {
    const informationContentType = useSelector(selectInformationContentType)

    return (
        <div>
            {informationContentType === 'view' && <InformationModalView />}
            {informationContentType === 'edit' && <InformationModalEdit />}
            {informationContentType === 'history' && <InformationModalHistory />}
            {informationContentType === 'new' && <InformationModalEdit />}
        </div>
    );
};

export default InformationModalBody;
