import React from 'react';
import {useSelector} from "react-redux";
import {selectInformationContentType} from "@/store/slices/appearanceSlice";
import InformationViewEdit from "@/components/modals/informationModal/informationViewEdit/informationViewEdit";
import InformationModalHistory from "@/components/modals/informationModal/informationHistory/informationModalHistory";

const InformationModalBody = () => {
    const informationContentType = useSelector(selectInformationContentType)

    return (
        <div>
            {(informationContentType === 'view' || informationContentType === 'edit' || informationContentType === 'new') && <InformationViewEdit />}
            {informationContentType === 'history' && <InformationModalHistory />}
        </div>
    );
};

export default InformationModalBody;
