import React from 'react';
import Link from "next/link";

const createTimelineButton = () => {
    return (
        <Link href={'/timelines/new'}>
            <div className={`flex items-center gap-1.5 max-[850px]:gap-2 pl-2.5 pr-3 max-[850px]:px-2.5 h-[30px] max-[850px]:h-[36px] max-[850px]:w-full font-semibold min-[850px]:border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 min-[850px]:drop-shadow-sm rounded-md`}>
                <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe03b;</div>
                <div className={'text-sm font-semibold max-[850px]:w-full'}>Create</div>
            </div>
        </Link>
    );
};

export default createTimelineButton;
