import React from "react";
import CompareButton from "@/components/modals/compareButton";
import InformationContributions from "@/components/modals/informationModal/informationHistory/informationContributions";

const InformationModalHistory = () => {
    return (
        <div>
            <div className={'pb-3 flex items-center justify-end bg-white'}>
                <CompareButton/>
            </div>
            <hr />
            <InformationContributions/>
        </div>
    );
};

export default InformationModalHistory;
