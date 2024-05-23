import React from 'react';
import Link from "next/link";
import Image from "next/image";

const createTimelineButton = () => {
    return (
        <Link href={'/'}>
            <div className={`pc flex items-center pl-3 pr-1.5 py-1.5 h-[36px] font-semibold max-[850px]:w-full max-[850px]:p-0`}>
                <div className={'px-3 py-1.5 h-[36px] rounded-full bg-white hover:bg-gray-100 font-semibold max-[850px]:w-full max-[850px]:rounded-none'}>Create</div>
            </div>
            {/*<div className={`pc flex items-center max-[850px]:hidden pl-3 pr-1.5 py-1.5 h-[36px] rounded-full font-semibold`}>*/}
            {/*    <div className={'px-3 py-1.5 h-[36px] rounded-b-3xl rounded-t-3xl bg-white hover:bg-gray-100 font-semibold max-[850px]:rounded-b-md max-[850px]:rounded-t-none'}>Create</div>*/}
            {/*</div>*/}
            {/*<div className={'mobile hidden relative mr-4 justify-center items-center shrink-0 max-[850px]:flex'}>*/}
            {/*    <button className={'border-[1.5px] border-black rounded-full'}><Image src={'/svg/add.svg'} alt={'create'} width={24} height={24}/></button>*/}
            {/*</div>*/}
        </Link>
    );
};

export default createTimelineButton;
