import React from 'react';
import Link from "next/link";
import ShareButton from "@/components/layout/share/shareButton";
import FeedbackButton from "@/components/layout/feedbackButton";
import {updateIsSearch} from "@/store/slices/searchSlice";
import Image from "next/image";
import ComputerSearchBar from "@/components/layout/search/ComputerSearchBar";

const ComputerNavbarControl = () => {
    return (
        <div className={'h-[60px] flex items-center justify-between pl-4 pr-1'}>
            <div className={'flex items-center gap-5'}>
                <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
                <ComputerSearchBar />
            </div>
            <div className={'flex items-center'}>
                <ShareButton />
                <FeedbackButton />
            </div>
        </div>
    );
};

export default ComputerNavbarControl;
