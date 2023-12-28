import React from 'react';
import Image from "next/image";
import HorizontalSplitSVG from '@/public/svg/horizontalSplit.svg'
import LastPageSVG from '@/public/svg/lastPage.svg'
import FirstPageSVG from '@/public/svg/firstPage.svg'
import NavigateBeforeSVG from '@/public/svg/NavigateBefore.svg'
import NavigateNextSVG from '@/public/svg/NavigateNext.svg'

const Toolbar = () => {
    return (
        <div className={'fixed bottom-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[200px] h-[45px] border-[1px] rounded-3xl bg-white drop-shadow-md'} style={{zIndex: 4999}}>
            <div className={'flex items-center'}>
                <button className={'px-[6px]'}><Image src={FirstPageSVG} alt={'last depth'} /></button>
                <button className={'px-[6px]'}><Image src={NavigateBeforeSVG} alt={'plus one depth'} /></button>
                <button className={'px-[7px] border-x-[1px]'}><Image src={HorizontalSplitSVG} alt={'timeline menu'} /></button>
                <button className={'px-[6px]'}><Image src={NavigateNextSVG} alt={'minus one depth'} /></button>
                <button className={'px-[6px]'}><Image src={LastPageSVG} alt={'first depth'} /></button>
            </div>
        </div>
    );
};

export default Toolbar;
