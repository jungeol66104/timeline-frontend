import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentTopic} from "@/store/slices/appearanceSlice";

const TagBar = () => {
    const router = useRouter()
    const isIndex = router.pathname === '/'
    const currentTag = useSelector(selectCurrentTopic)

    return (
        <div className={`hidden categoryBar fixed flex pt-2 pb-1.5 h-fit w-full border-b-[1px] bg-white z-[4999] ${!isIndex && 'hidden'} overflow-x-auto`}>
            <div className={'w-full flex gap-2 px-4'}>
                {/*<Link href={'/'} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTag === 'Hot' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}><span>&#x1F525; Hot</span></Link>*/}
                {/*<Link href={'/'} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTag === 'Staff Picks' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}><span>Staff Picks</span></Link>*/}
                <Link href={'/?tagNum=1'} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTag === 'Popular' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}><span>Popular</span></Link>
                <Link href={'/?tagNum=0'} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTag === 'Recently Added' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold shrink-0`}><span>Recently Added</span></Link>
            </div>
        </div>
    );
};


export default TagBar;
