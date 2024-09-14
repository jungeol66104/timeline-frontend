import React from 'react';
import Link from "next/link";

const HistoriesButton = () => {

    return (
        <Link href={`/histories`} className={`w-full h-[36px] flex items-center gap-2 px-2.5 rounded-md bg-white hover:bg-gray-100 text-left`}>
            <div className={'material-symbols-outlined shrink-0 text-[20px]'}>&#xe889;</div>
            <div className={'text-sm font-semibold'}>Histories</div>
        </Link>
    );
};

export default HistoriesButton;
