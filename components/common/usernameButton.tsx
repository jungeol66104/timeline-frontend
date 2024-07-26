import React from 'react';
import Link from "next/link";

const UsernameButton = ({name} : {name: string}) => {
    return (
        <Link href={'/'} className={`flex items-center gap-2.5 px-3 max-[852px]:px-2 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'flex gap-1.5 justify-center items-center'}>
                <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>{name.slice(0,2).toUpperCase()}</div>
                <span className={'text-sm font-semibold'}>{name}</span>
            </div>
        </Link>
    );
};

export default UsernameButton;
