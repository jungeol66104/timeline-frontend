import React from 'react';
import useInformationBar from "@/hooks/useInformationBar";
import useInformationBarTest from "@/hooks/useInformationBarTest";

const InformationBar = () => {
    useInformationBarTest()

    return (
        <div className={'informationHeader hidden sticky top-[60px] pt-[5px] pb-[3px] w-full flex-col bg-white border-b-[1px]'} style={{zIndex: 4999}}>
            <span className={'informationHeaderName pl-4 w-full max-w-[630px] min-[852px]:max-w-[1002px] text-sm font-semibold'}></span>
        </div>
    );
};

export default InformationBar;
