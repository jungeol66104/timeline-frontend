import React, {useEffect, useRef} from 'react';

const AdsTimelineSide = () => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const insElement = adRef.current
        if (insElement && !insElement.firstChild && window && (window as any).adsbygoogle) (window as any).adsbygoogle.push({})
    }, []);

    return (
        // <div className={'adsTimelineSide sticky top-[76px] mt-4 w-full max-[852px]:hidden h-fit flex justify-center bg-[#F2F2F259] border-[1px] border-[#E5E7EB]'}>
        <div className={'adsTimelineSide mt-4 w-full max-[852px]:hidden h-fit flex justify-center bg-[#F2F2F259] border-[1px] border-[#E5E7EB]'}>
            <div className={'adsTimelineSideWrapper p-4 w-full max-w-[352px] flex flex-col items-center gap-2.5'}>
                <div className={'text-xs font-semibold text-gray-400'}>ADVERTISEMENT</div>
                <style>
                    {`
                        .timeline_page_side {display: block; width: 300px; height: 600px;}
                        @media(max-width: 852px) {.timeline_page_side {display:none;}}
                    `}
                </style>
                <ins
                    ref={adRef}
                    className="adsbygoogle timeline_page_side"
                    data-ad-client="ca-pub-9076277653795477"
                    data-ad-slot="3370354398">
                    {/*<div className={'relative w-[300px] h-[250px] overflow-hidden'}><Image src={'/images/970x250.jpg'} alt={'base-image'} fill={true}/></div>*/}
                </ins>
            </div>
        </div>
    );
};
export default AdsTimelineSide;