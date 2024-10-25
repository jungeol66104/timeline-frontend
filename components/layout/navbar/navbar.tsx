import React from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import TimelineTitleBar from "@/components/layout/navbar/timelineTitleBar";
import ComputerSearchBar from "@/components/layout/search/ComputerSearchBar";
import SearchButton from "@/components/layout/navbar/searchButton";
import TagBar from "@/components/layout/navbar/tagBar";
import ProfileMenuButton from "@/components/layout/navbar/profileMenuButton";
import CreateTimelineButton from "@/components/layout/menu/createTimelineButton";

const Navbar = ({loadingState} : {loadingState: string}) => {
    const router = useRouter()
    const isIndexPage = router.pathname === '/'

    return (
        <>
            <nav className={`navbar fixed top-0 left-0 w-full h-[60px] bg-white shadow-md flex items-center justify-between`} style={{zIndex: 5000}}>
                <div className={'flex items-center gap-5'}>
                    <Link href={'/'} className={`shrink-0 w-fit font-[700] text-2xl transform transition-opacity ease-in-out duration-300 ml-4`} style={{fontFamily: "'ubuntu', Arial, sans-serif"}}>timeline wiki</Link>
                    <ComputerSearchBar />
                </div>
                <div className={'flex items-center ml-2'}>
                    <div className={'pc flex items-center gap-4 pr-1.5 max-[910px]:hidden'}>
                        <CreateTimelineButton />
                        <ProfileMenuButton />
                    </div>
                    <div className={'mobile hidden items-center max-[910px]:flex'}>
                        <SearchButton />
                        <ProfileMenuButton />
                    </div>
                </div>
            </nav>
            {(loadingState !== 'applying' || isIndexPage) && <TagBar/>}
            {loadingState !== 'applying' && <TimelineTitleBar/>}
        </>
    )
}
export default Navbar