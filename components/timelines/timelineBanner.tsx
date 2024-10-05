import React, {useEffect, useState} from 'react';

const TimelineBanner = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [bannerHeight, setBannerHeight] = useState(0);

    useEffect(() => {
        const timelineBannerClosed = sessionStorage.getItem('timelineBannerClosed');
        if (!timelineBannerClosed) setIsOpen(true);
        else setIsOpen(true);
    }, []);

    const handleClick = () => {
        setIsOpen(false);
        sessionStorage.setItem('timelineBannerClosed', 'true');
    };

    const bottom = isOpen ? 0 : '-100%'

    return (
        <div className={'timelineBanner fixed w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col items-center bg-white rounded-t-2xl'} style={{zIndex: 5002, bottom: bottom, transition: 'bottom 0.3s'}}>

            <div className={'relative py-2.5 w-full h-[44px] text-center'}>
                <button onClick={handleClick} className={'absolute right-1 top-1 px-2 h-[36px] hover:bg-gray-100 rounded-2xl shrink-0 material-symbols-outlined text-[20px]'}>&#xe5cd;</button>
            </div>
            <div className={'modalScrollWrapper p-4 w-full h-full flex flex-col gap-3'}></div>
        </div>
    );
};

export default TimelineBanner;
