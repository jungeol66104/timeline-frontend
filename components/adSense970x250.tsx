import React, {useEffect, useRef} from 'react';
import Image from "next/image";

const AdSense970x250 = () => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const insElement = adRef.current
        if (insElement && !insElement.firstChild && window && (window as any).adsbygoogle) (window as any).adsbygoogle.push({})
    }, []);


    return (
        <div className={'py-4 w-full h-fit flex flex-col items-center gap-2.5 bg-[#F2F2F259]'}>
            <div className={'text-xs font-semibold text-gray-400'}>ADVERTISEMENT</div>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{display: "block"}}
                data-ad-client="ca-pub-9076277653795477"
                data-ad-slot="2143912951"
                data-ad-format="auto"
                data-full-width-responsive="true">
                <div className={'relative w-[300px] h-[250px] overflow-hidden'}><Image src={'/images/970x250.jpg'} alt={'base-image'} fill={true}/></div>
            </ins>
        </div>
    );
};

export default AdSense970x250;
