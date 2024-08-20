import React from "react";
import CompareButton from "@/components/common/compareButton";
import InformationContributions from "@/components/modals/timelineModal/timelineModalHistory/informationContributions";

const InformationModalHistory = () => {
    return (
        <div>
            <div className={'sticky top-0 pb-3 flex items-center justify-end bg-white'}>
                <CompareButton/>
            </div>
            <hr />
            <InformationContributions/>
        </div>
    );
};

export default InformationModalHistory;
