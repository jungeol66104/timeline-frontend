import React from 'react';
import InformationView from "@/components/modal/informationModal/informationView";
import InformationEdit from "@/components/modal/informationModal/informationEdit";
import {useSelector} from "react-redux";
import {selectModalContentType} from "@/store/slices/appearanceSlice";

const InformationModalBody = () => {
    const contentType = useSelector(selectModalContentType)

    return (
        <div>
            {contentType === 'view'
                ?   <InformationView />
                :   contentType === 'edit'
                    ?   <InformationEdit />
                    :   <></>
            }
        </div>
    );
};

export default InformationModalBody;
