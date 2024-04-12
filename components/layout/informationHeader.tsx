import React from 'react';
import useInformationHeader from "@/hooks/useInformationHeader";

const InformationHeader = () => {
    useInformationHeader()

    return (
        <div className={'informationHeader fixed top-[60px] pt-[5px] pb-[3px] w-full hidden flex-col bg-white text-sm font-semibold border-b-[1px]'} style={{zIndex: 4999}}>
            <div className={'informationHeaderName w-full px-3 max-w-[600px]'}></div>
        </div>
    );
};

export default InformationHeader;
