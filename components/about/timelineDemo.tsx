import React from 'react';
import {useSelector} from "react-redux";
import {useDisableDemoScroll} from "@/hooks/useScroll";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import InformationDemoModal from "@/components/about/informationDemoModal";
import EventDemoModal from "@/components/about/eventDemoModal";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";
// reviewed: 0817

const TimelineDemo = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    useDisableDemoScroll()

    return (
        <div className={`relative overflow-hidden w-full ${demoKeyConcept === 'timeline' && 'outline outline-2 outline-blue-700'} border-[1px] border-gray-300 rounded-2xl`}>
            <div className={`demoScrollWrapper relative w-full h-[450px] overflow-y-scroll`} style={{maxHeight: 'calc(100vh - 100px)'}}>
                <div className={'demoLayout'}>
                    <TimelineSectionPrimary />
                </div>
            </div>
            <InformationDemoModal />
            <EventDemoModal />
        </div>
    );
};

export default TimelineDemo;
