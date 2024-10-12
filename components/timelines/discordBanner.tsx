import React, {useEffect, useLayoutEffect, useState} from 'react';

const DiscordBanner = () => {
    const [hide, setHide] = useState(false);

    useLayoutEffect(() => {
        const discordBannerHide = sessionStorage.getItem('discordBannerHide');
        if (discordBannerHide) setHide(true);
        else setHide(false);
    }, []);

    const handleClick = () => {
        setHide(true);
        sessionStorage.setItem('discordBannerHide', 'true');
    };

    return (
        <div className={`${hide && 'hidden'} p-3 w-full flex max-[500px]:flex-col justify-between gap-3 items-center bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl`}>
            <div className={'w-full max-[500px]:text-center'}>
                <span className={'text-md font-semibold'}>Community for Timeline Editors</span>
                <div className={'text-sm text-gray-500'}>Place where unique editors like you interact</div>
            </div>
            <div className={'flex gap-3 shrink-0 justify-end'}>
                <button onClick={handleClick} className={'text-gray-500 text-sm font-medium hover:text-black'}>Not Now</button>
                <a href={'https://discord.gg/273PZzCV'} target="_blank" rel="noopener noreferrer" className={'p-4 flex items-center justify-center h-[36px] rounded-full bg-[#6567E9] hover:bg-[#4E50D1] text-white text-sm font-medium border-[0.1px] border-gray-300'}>Join Discord</a>
            </div>
        </div>
    );
};

export default DiscordBanner;
