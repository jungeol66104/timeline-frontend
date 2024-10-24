import React from 'react';
import {useSelector} from "react-redux";
import {selectInformationContentType} from "@/store/slices/appearanceSlice";
import InformationView from "@/components/modals/informationModal/informationView/informationView";
import InformationEdit from "@/components/modals/informationModal/informationEdit/informationEdit";
import InformationModalHistory from "@/components/modals/informationModal/informationHistory/informationModalHistory";

const InformationModalBody = () => {
    const informationContentType = useSelector(selectInformationContentType)

    return (
        <div>
            {informationContentType === 'view' && <InformationView />}
            {informationContentType === 'edit' && <InformationEdit />}
            {informationContentType === 'history' && <InformationModalHistory />}
            {informationContentType === 'new' && <InformationEdit />}
        </div>
    );
};

export default InformationModalBody;
