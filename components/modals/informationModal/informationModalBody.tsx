import React from 'react';
import {useSelector} from "react-redux";
import {selectInformationContentType} from "@/store/slices/appearanceSlice";
import InformationView from "@/components/modals/informationModal/informationView/informationView";
import InformationModalEdit from "@/components/modals/informationModal/informationEdit/informationModalEdit";
import InformationModalHistory from "@/components/modals/informationModal/informationHistory/informationModalHistory";

const InformationModalBody = () => {
    const informationContentType = useSelector(selectInformationContentType)

    return (
        <div>
            {informationContentType === 'view' && <InformationView />}
            {informationContentType === 'edit' && <InformationModalEdit />}
            {informationContentType === 'history' && <InformationModalHistory />}
            {informationContentType === 'new' && <InformationModalEdit />}
        </div>
    );
};

export default InformationModalBody;
