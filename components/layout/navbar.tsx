import React from "react";
import InformationBar from "@/components/layout/informationBar";
import Link from "next/link";
import ComputerSearchBar from "@/components/layout/search/ComputerSearchBar";
import ShareButton from "@/components/layout/share/shareButton";
import FeedbackButton from "@/components/layout/feedbackButton";
import MenuButton from "@/components/layout/menuButton";
import SearchButton from "@/components/layout/search/searchButton";
import TagBar from "@/components/layout/tagBar";
import ProfileButton from "@/components/layout/account/profileButton";
import CreateTimelineButton from "@/components/layout/createTimelineButton";

const Navbar = ({isLoading} : {isLoading: boolean}) => {
    return (
        <>
            <nav className={'navbar sticky top-0 left-0 h-[60px] w-full bg-white shadow-md flex items-center justify-between'} style={{zIndex: 5000}}>
                <div className={'flex items-center gap-5'}>
                    <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300 ml-4`}>Timeline</Link>
                    <ComputerSearchBar />
                </div>
                <div className={'flex items-center ml-2'}>
                    <div className={'pc flex items-center pr-1.5 max-[850px]:hidden'}>
                        <CreateTimelineButton />
                        <ProfileButton />
                    </div>
                    <div className={'mobile hidden items-center max-[850px]:flex'}>
                        <SearchButton />
                        {/*<CreateTimelineButton />*/}
                        <ProfileButton />
                    </div>
                </div>
            </nav>
            <TagBar />
            {!isLoading && <InformationBar/>}
        </>
    )
}
export default Navbar