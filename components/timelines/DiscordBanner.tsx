import React from 'react';
import Link from "next/link";

const DiscordBanner = () => {
    return (
        <div className={'p-3 w-full flex flex-col gap-3 items-center bg-[#F2F2F259] border-[1px] border-gray-300 rounded-2xl'}>
            <div className={'w-full'}>
                <div className={'flex items-start gap-1'}>
                    <span className={'text-md'}>&#128101;</span>
                    <span className={'text-lg font-semibold'}>Editors&apos; Community</span>
                </div>
                <div className={'text-sm text-gray-500'}>Place where timeline wiki editors interact</div>
                <span className={'text-sm font-medium'}>We know editors like you are unique. What you create and edit benefit people all around the world. If you’re one of them, join us!</span>
            </div>
            <div className={'w-full flex justify-end'}><a href={'https://discord.gg/273PZzCV'} target="_blank" rel="noopener noreferrer" className={'p-4 flex items-center justify-center h-[36px] rounded-full bg-[#6567E9] text-white text-sm font-medium border-[0.1px] border-gray-300'}>Join Discord</a></div>
        </div>
    );
};

export default DiscordBanner;
