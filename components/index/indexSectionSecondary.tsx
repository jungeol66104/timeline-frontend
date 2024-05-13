import React from 'react';
import AdsIndexSide from "@/components/ads/adsIndexSide";

const IndexSectionSecondary = () => {
    return (
        <div className={`relative ml-[20px] max-[872px]:ml-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden`}>
            <div className={'secondaryWrapper relative p-4 max-[852px]:py-0 w-full h-fit min-w-[332px] max-w-[352px] max-[852px]:max-w-[630px]'}>
                <AdsIndexSide/>
            </div>
        </div>
    );
};

export default IndexSectionSecondary;
