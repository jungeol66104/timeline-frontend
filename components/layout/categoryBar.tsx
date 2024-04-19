import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const CategoryBar = () => {
    const router = useRouter()
    const isIndex = router.pathname === '/'

    return (
        <Link href={'/'} className={`categoryBar fixed flex gap-2.5 px-4 pt-2 pb-1.5 h-fit w-full border-b-[1px] bg-white z-[4999] ${!isIndex && 'hidden'}`}>
            <div className={'h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] border-black bg-white hover:bg-gray-100 text-sm font-semibold'}><span>Hot</span></div>
            <div className={'h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-200 bg-white hover:bg-gray-100 text-sm font-semibold'}><span>Popular</span></div>
            <div className={'h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] border-gray-200 bg-white hover:bg-gray-100 text-sm font-semibold'}><span>Recently Added</span></div>
        </Link>
    );
};


export default CategoryBar;
