import React from 'react';
import useInformationBar from "@/hooks/useInformationBar";

const InformationBar = () => {
    // useInformationBar()

    return (
        <div className={'informationHeader fixed top-[60px] pt-[5px] pb-[3px] w-full flex-col hidden bg-white border-b-[1px]'} style={{zIndex: 4999}}>
            <span className={'informationHeaderName pl-4 w-full max-w-[600px] min-[928px]:max-w-[958px] text-sm font-semibold'}></span>
        </div>
    );
};

export default InformationBar;
