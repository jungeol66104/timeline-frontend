import React, {useEffect, useRef} from 'react';
import Image from "next/image";

const AdsTimelineBetweenSecondary = () => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const insElement = adRef.current
        if (insElement && !insElement.firstChild && window && (window as any).adsbygoogle) (window as any).adsbygoogle.push({})
    }, []);

    return (
        <div className={'adsTimelineBetweenSecondary w-full h-fit flex justify-center bg-[#F2F2F259] border-x-[1px] border-x-[#E5E7EB]'}>
            <div className={'adsTimelineBetweenSecondaryWrapper p-4 w-full max-w-[352px] flex flex-col items-center gap-2.5'}>
                <div className={'text-xs font-semibold text-gray-400'}>ADVERTISEMENT</div>
                <style>
                    {`
                        .timeline_page_between_secondary {display: block; width: 300px; height: 250px;}
                        @media(max-width: 300px) {.timeline_page_between_secondary {display:none;}}
                    `}
                </style>
                <ins
                    ref={adRef}
                    className="adsbygoogle timeline_page_between_secondary"
                    data-ad-client="ca-pub-9076277653795477"
                    data-ad-slot="2728190714">
                    {/*<div className={'relative w-[300px] h-[250px] overflow-hidden'}><Image src={'/images/970x250.jpg'} alt={'base-image'} fill={true}/></div>*/}
                </ins>
            </div>
        </div>
    );
};
export default AdsTimelineBetweenSecondary;
