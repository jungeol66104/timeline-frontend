import React from 'react';
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import {useSelector} from "react-redux";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";
import TimelineDemoModal from "@/components/about/timelineDemoModal";
import {useDisableDemoScroll} from "@/hooks/useScroll";
import EventDemoModal from "@/components/about/eventDemoModal";

const TimelineDemo = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    useDisableDemoScroll()

    return (
        <div className={`relative overflow-hidden w-full ${demoKeyConcept === 'timeline' && 'outline outline-2 outline-blue-700'} border-[1px] border-gray-300 rounded-2xl`}>
            <div className={`demoScrollWrapper relative w-full h-[500px] overflow-y-scroll`} style={{maxHeight: 'calc(100vh - 100px)'}}>
                <div className={'demoLayout'}>
                    <TimelineSectionPrimary />
                </div>
            </div>
            <TimelineDemoModal />
            <EventDemoModal />
        </div>
    );
};

export default TimelineDemo;
