import React, {useEffect, useRef} from 'react';

const AdsIndexSide = () => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const insElement = adRef.current
        if (insElement && !insElement.firstChild && window && (window as any).adsbygoogle) (window as any).adsbygoogle.push({})
    }, []);

    return (
        // <div className={'adsIndexSide sticky top-[122.67px] w-full max-[852px]:hidden h-fit flex justify-center bg-[#F2F2F259] border-[1px] border-x-[#E5E7EB]'}>
        <div className={'adsIndexSide w-full max-[852px]:hidden h-fit flex justify-center bg-[#F2F2F259] border-[1px] border-x-[#E5E7EB]'}>
            <div className={'adsIndexSideWrapper p-4 w-full max-w-[352px] flex flex-col items-center gap-2.5'}>
                <div className={'text-xs font-semibold text-gray-400'}>ADVERTISEMENT</div>
                <style>
                    {`
                        .index_page_side {display: block; width: 300px; height: 600px;}
                        @media(max-width: 852px) {.index_page_side {display:none;}}
                    `}
                </style>
                <ins
                    ref={adRef}
                    className="adsbygoogle index_page_side"
                    data-ad-client="ca-pub-9076277653795477"
                    data-ad-slot="6620786966">
                    {/*<div className={'relative w-[300px] h-[250px] overflow-hidden'}><Image src={'/images/970x250.jpg'} alt={'base-image'} fill={true}/></div>*/}
                </ins>
            </div>
        </div>
    );
};
export default AdsIndexSide;