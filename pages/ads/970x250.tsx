import React, {useEffect, useRef} from 'react';
import Image from "next/image";

const Test970x250 = () => {
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        const insElement = adRef.current
        if (insElement && !insElement.firstChild && window && (window as any).adsbygoogle) (window as any).adsbygoogle.push({})
    }, []);


    return (
        <div className={'page justify-center'}>
            <div className={'py-4 w-full max-w-[1002px] h-fit flex flex-col items-center gap-1 bg-[#F2F2F259]'}>
                <div className={'text-xs font-semibold text-gray-400'}>ADVERTISEMENT</div>
                <ins
                    ref={adRef}
                    className="adsbygoogle"
                    style={{display: "block"}}
                    data-ad-client="ca-pub-9076277653795477"
                    data-ad-slot="2143912951"
                    data-ad-format="auto"
                    data-full-width-responsive="true">
                    <Image src={'/images/970x250.jpg'} alt={'base-image'} width={970} height={250}/>
                </ins>
            </div>
        </div>
    );
};

export default Test970x250;
