import React from 'react';
import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/components/layout/share/shareButton";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import FeedbackButton from "@/components/layout/feedbackButton";
import SearchButton from "@/components/layout/search/searchButton";
import MenuButton from "@/components/layout/menuButton";

const MobileNavbarControl = ({isMobileSize}:{isMobileSize: boolean}) => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'h-[60px] w-full flex items-center justify-between'}>
            <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
            <div className={'flex items-center gap-2.5'}>
                {/*<ShareButton isMobileSize={isMobileSize}/>*/}
                {/*<FeedbackButton isMobileSize={isMobileSize}/>*/}
                <MenuButton />
                <SearchButton />
            </div>
        </div>
    );
};

export default MobileNavbarControl;
