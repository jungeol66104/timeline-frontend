import React from 'react';
import Link from "next/link";
import Image from "next/image";
import ShareButton from "@/components/layout/share/shareButton";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {useDispatch, useSelector} from "react-redux";
import FeedbackButton from "@/components/layout/feedbackButton";

const MobileNavbarControl = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'h-[60px] w-full flex items-center justify-between'}>
            <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
            <div className={'flex items-center gap-2.5'}>
                <ShareButton />
                <FeedbackButton />
                <button>
                    {!isSearch ? <Image onClick={() => dispatch(updateIsSearch(true))} src={'/svg/search.svg'} alt={'search'} width={24} height={24} /> : <Image onClick={() => dispatch(updateIsSearch(false))} src={'/svg/close.vg'} alt={'close'} width={24} height={24} />}
                </button>
                <button className={'hidden'}>
                    <Image src={'/svg/menu.svg'} alt={'menu'} width={24} height={24} />
                </button>
            </div>
        </div>
    );
};

export default MobileNavbarControl;
