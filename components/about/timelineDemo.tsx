import React from 'react';
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";
import KeyConceptBar from "@/components/about/keyConceptBar";
import KeyConceptDescription from "@/components/about/keyConceptDescription";

const TimelineDemo = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    return (
        <div className={`overflow-hidden ${demoKeyConcept === 'timeline' && 'outline outline-2 outline-blue-700'} border-[1px] border-gray-300 rounded-2xl`}>
            <div className={`w-full h-[500px] overflow-y-scroll`} style={{maxHeight: 'calc(100vh - 100px)'}}>
                <TimelineSectionPrimary />
            </div>
        </div>
    );
};

export default TimelineDemo;
