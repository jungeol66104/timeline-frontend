import React, {useEffect, useState} from 'react';

const BannerModal = () => {
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
        <div className={'page fixed left-0 bottom-0'}>
            <div className={'pageWrapper'}>
                <div className={'timelineBanner absolute w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col items-center bg-white rounded-t-2xl border-2 border-black'} style={{zIndex: 5002, bottom: bottom, transition: 'bottom 0.3s'}}>
                    <div className={'relative py-2.5 w-full h-[44px] text-center'}>
                        <button onClick={handleClick} className={'absolute right-1 top-1 px-2 h-[36px] hover:bg-gray-100 rounded-2xl shrink-0 material-symbols-outlined text-[20px]'}>&#xe5cd;</button>
                    </div>
                    <div className={'modalScrollWrapper p-4 w-full h-full flex flex-col gap-3'}></div>
                </div>

                {/* Section Secondary */}
                <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>

            </div>
        </div>
    );
};

export default BannerModal;
