import React from 'react';
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";

const TimelineDemo = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={`w-full h-[500px] ${demoKeyConcept === 'timeline' ? 'border-[4px] border-blue-700' : 'border-[1px] border-gray-300 '} rounded-2xl overflow-y-scroll`} style={{maxHeight: 'calc(100vh - 100px)'}}>
            <TimelineSectionPrimary />
        </div>
    );
};

export default TimelineDemo;
