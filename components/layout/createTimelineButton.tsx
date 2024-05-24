import React from 'react';
import Link from "next/link";
import Image from "next/image";

const createTimelineButton = () => {
    return (
        <Link href={'/'}>
            <div className={`flex items-center gap-1.5 pl-1.5 pr-3 h-[30px] max-[850px]:h-[36px] max-[850px]:w-full font-semibold min-[850px]:border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                <div className={'w-5'}><Image src={'/svg/add.svg'} alt={'createTimeline'} width={20} height={20} /></div>
                <div className={'text-sm font-semibold max-[850px]:w-full'}>Create</div>
            </div>
        </Link>
    );
};

export default createTimelineButton;
