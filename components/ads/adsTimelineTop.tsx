import React, {useEffect, useRef} from 'react';
import Image from "next/image";

const AdsTimelineTop = () => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const insElement = adRef.current
        if (insElement && !insElement.firstChild && window && (window as any).adsbygoogle) (window as any).adsbygoogle.push({})
    }, []);


    return (
        <div className={'adsTimelineTop w-full h-fit flex bg-[#F2F2F259]'}>
            <div className={'adsTimelineTopWrapper p-4 w-full max-w-[1002px] flex flex-col items-center gap-2.5'}>
                <div className={'text-xs font-semibold text-gray-400'}>ADVERTISEMENT</div>
                <style>
                    {`
                        .timeline_page_top {display: block; width: 300px; height: 100px;}
                        @media(max-width: 300px) {.timeline_page_top {display:none;}}
                        @media(min-width: 468px) {.timeline_page_top {width: 468px; height: 60px;}}
                        @media(min-width: 728px) {.timeline_page_top {width: 728px; height: 90px;}}
                        @media(min-width: 970px) {.timeline_page_top {width: 970px; height: 250px;}}
                    `}
                </style>
                <ins
                    ref={adRef}
                    className="adsbygoogle timeline_page_top"
                    data-ad-client="ca-pub-9076277653795477"
                    data-ad-slot="2143912951">
                    {/*<div className={'relative w-[300px] h-[250px] overflow-hidden'}><Image src={'/images/970x250.jpg'} alt={'base-image'} fill={true}/></div>*/}
                </ins>
            </div>
        </div>
    );
};

export default AdsTimelineTop;
