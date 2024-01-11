import React from 'react';
import Image from "next/image";

const SwiperCard = () => {
    return (
        <div className={'swiperCard relative shrink-0'} >
            <Image src={'/images/timeline/1.png'} alt={'Joe Biden'} fill className={'rounded-xl'}/>
            <div className={'absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-b from-transparent via-50% via-transparent to-black opacity-80'}></div>
            <div className={'absolute bottom-0 left-0 w-full p-2.5 font-semibold text-white'}>
                <div className={'font-semibold text-white'}>조 바이든</div>
                <div className={'font-medium text-white text-sm line-clamp-1'}>제 46대 미국 대통령</div>
            </div>
        </div>
    );
};

export default SwiperCard;
