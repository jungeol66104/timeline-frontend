import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectCurrentTopic} from "@/store/slices/appearanceSlice";

const TopicBar = () => {
    const router = useRouter()
    const isIndex = router.pathname === '/'
    const currentTopic = useSelector(selectCurrentTopic)

    return (
        <div className={`categoryBar fixed flex pt-2 pb-1.5 h-fit w-full border-b-[1px] bg-white z-[4999] ${!isIndex && 'hidden'}`}>
            <div className={'w-full max-w-[600px] flex gap-2.5 px-4'}>
                {/*<Link href={'/'} className={'h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] border-black bg-white hover:bg-gray-100 text-sm font-semibold'}><span>Hot</span></Link>*/}
                <Link href={'/?tagNum=0'} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTopic === 'Recently Added' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold`}><span>Recently Added</span></Link>
                <Link href={'/?tagNum=1'} className={`h-[32px] w-fit px-3 flex items-center justify-center rounded-3xl border-[1px] ${currentTopic === 'Popular' ? 'border-black' : 'border-gray-200 hover:bg-gray-100'} bg-white text-sm font-semibold`}><span>Popular</span></Link>
            </div>
        </div>
    );
};


export default TopicBar;
