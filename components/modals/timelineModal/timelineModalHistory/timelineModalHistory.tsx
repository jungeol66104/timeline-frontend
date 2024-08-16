import React from "react";
import CompareButton from "@/components/common/compareButton";
import TimelineContributions from "@/components/modals/timelineModal/timelineModalHistory/timelineContributions";

const TimelineModalHistory = () => {
    return (
        <div>
            <div className={'sticky top-0 pb-3 flex items-center justify-end bg-white'}>
                <CompareButton/>
            </div>
            <hr />
            <TimelineContributions/>
        </div>
    );
};

export default TimelineModalHistory;
