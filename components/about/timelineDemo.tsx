import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept} from "@/store/slices/appearanceSlice";
import {useDisableDemoScroll} from "@/hooks/useScroll";
import TimelineSectionPrimary from "@/components/timelines/timelineSectionPrimary";
import InformationDemoModal from "@/components/about/informationDemoModal";
import EventDemoModal from "@/components/about/eventDemoModal";

const TimelineDemo = () => {
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    useDisableDemoScroll()

    return (
        <div className={`relative overflow-hidden w-full ${demoKeyConcept === 'timeline' && 'outline outline-2 outline-blue-700'} border-[1px] border-gray-300 rounded-2xl`}>
            <div className={`demoScrollWrapper relative overflow-y-scroll w-full h-[470px] min-[630px]:h-[476px]`} style={{maxHeight: 'calc(100vh - 100px)'}}>
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
