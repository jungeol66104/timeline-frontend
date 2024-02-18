import React from 'react';
import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/components/layout/share/shareButton";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import FeedbackButton from "@/components/layout/feedbackButton";
import SearchButton from "@/components/layout/search/searchButton";

const MobileNavbarControl = ({isMobileSize}:{isMobileSize: boolean}) => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'h-[60px] w-full flex items-center justify-between'}>
            <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
            <div className={'flex items-center gap-1'}>
                <ShareButton isMobileSize={isMobileSize}/>
                <FeedbackButton isMobileSize={isMobileSize}/>
                <SearchButton />
                <button className={'hidden'}>
                    <Image src={'/svg/menu.svg'} alt={'menu'} width={24} height={24} />
                </button>
            </div>
        </div>
    );
};

export default MobileNavbarControl;
