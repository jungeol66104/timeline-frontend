import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";
import TimelineInformationHeader from "@/components/layout/timelineInformationHeader";
import Link from "next/link";
import ComputerSearchBar from "@/components/layout/search/ComputerSearchBar";
import ShareButton from "@/components/layout/share/shareButton";
import FeedbackButton from "@/components/layout/feedbackButton";
import MenuButton from "@/components/layout/menuButton";
import SearchButton from "@/components/layout/search/searchButton";
// refactoring: clear

const Navbar = () => {
    return (
        <>
            <nav className={'navbar fixed top-0 left-0 h-[60px] w-full bg-white shadow-md flex flex-col'} style={{zIndex: 5000}}>
                <div className={'h-[60px] flex items-center justify-between'}>
                    <div className={'flex items-center gap-5'}>
                        <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300 ml-4`}>Timeline</Link>
                        <ComputerSearchBar />
                    </div>
                    <div className={'flex items-center ml-2'}>
                        <div className={'pc flex items-center max-[850px]:hidden'}>
                            <ShareButton />
                            <FeedbackButton />
                        </div>
                        <div className={'mobile hidden items-center max-[850px]:flex'}>
                            <MenuButton />
                            <SearchButton />
                        </div>
                    </div>
                </div>
            </nav>
            <TimelineInformationHeader/>
        </>
    )
}
export default Navbar