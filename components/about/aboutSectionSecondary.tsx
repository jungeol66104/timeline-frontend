import React from 'react';
import TimelineExampleCard from "@/components/about/timelineExampleCard";

const AboutSectionSecondary = () => {
    return (
        <div className={`ml-[20px] max-[872px]:ml-0 p-4 w-full min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px] flex flex-col gap-4`}>
            <div className={'max-[872px]:hidden'}><TimelineExampleCard/></div>
        </div>
    );
};

export default AboutSectionSecondary;
