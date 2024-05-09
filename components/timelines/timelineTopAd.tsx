import React, {useEffect} from 'react';

const TimelineTopAd = () => {

    useEffect(() => {
        const insElement = document.querySelector('.adsbygoogle')
        if (insElement && !insElement.firstChild) {
            if (window && (window as any).adsbygoogle) {
                (window as any).adsbygoogle.push({});
            }
        }
    }, []);

    return (
        <div className={'h-[60px]'}>
            <ins className="adsbygoogle"
                 style={{display: 'block', border: '1px solid green'}}
                 data-ad-client="ca-pub-9076277653795477"
                 data-ad-slot="2143912951"
                 data-ad-format="horizontal"
                 data-full-width-responsive="true">
            </ins>
        </div>
    );
};

export default TimelineTopAd;
