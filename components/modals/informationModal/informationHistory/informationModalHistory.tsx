import React from "react";
import {useSelector} from "react-redux";
import {selectInformationHistoryType} from "@/store/slices/appearanceSlice";
import InformationHistoryList from "@/components/modals/informationModal/informationHistory/informationHistoryList";
import InformationHistoryView from "@/components/modals/informationModal/informationHistory/informationHistoryView";
import InformationHistoryDiff from "@/components/modals/informationModal/informationHistory/informationHistoryDiff";

const InformationModalHistory = () => {
    const informationHistoryType = useSelector(selectInformationHistoryType)

    return (
        <div className={'flex flex-col'}>
            {informationHistoryType === 'list'
                ? <InformationHistoryList/>
                : informationHistoryType === 'view'
                    ? <InformationHistoryView/>
                    : <InformationHistoryDiff/>
            }
        </div>
    );
};

export default InformationModalHistory;
