import React from "react";
import InformationBar from "@/components/layout/navbar/informationBar";
import Link from "next/link";
import ComputerSearchBar from "@/components/layout/search/ComputerSearchBar";
import SearchButton from "@/components/layout/navbar/searchButton";
import TagBar from "@/components/layout/navbar/tagBar";
import ProfileMenuButton from "@/components/layout/personal/profileMenuButton";
import CreateTimelineButton from "@/components/layout/navbar/createTimelineButton";

const Navbar = ({isLoading} : {isLoading: boolean}) => {
    return (
        <>
            <nav className={'navbar fixed top-0 left-0 w-full h-[60px] bg-white shadow-md flex items-center justify-between'} style={{zIndex: 5000}}>
                <div className={'flex items-center gap-5'}>
                    <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300 ml-4`}>Timeline</Link>
                    <ComputerSearchBar />
                </div>
                <div className={'flex items-center ml-2'}>
                    <div className={'pc flex items-center gap-4 pr-1.5 max-[850px]:hidden'}>
                        <CreateTimelineButton />
                        <ProfileMenuButton />
                    </div>
                    <div className={'mobile hidden items-center max-[850px]:flex'}>
                        <SearchButton />
                        <ProfileMenuButton />
                    </div>
                </div>
            </nav>
            <TagBar />
            {!isLoading && <InformationBar/>}
        </>
    )
}
export default Navbar