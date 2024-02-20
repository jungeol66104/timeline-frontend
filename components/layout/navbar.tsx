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
    const router = useRouter();
    const isHome = router.pathname === '/';
    const isTimeline = router.pathname.startsWith('/timelines')
    const isTopEnd = useSelector(selectIsTopEnd)
    const [showTimelineInformation, setShowTimelineInformation] = useState(false)

    useEffect(() => {
        const scrollWrapper: HTMLElement | null = typeof window !== 'undefined' ? document.documentElement : null
        if (!scrollWrapper) return

        const handleScroll = () => {
            if (isHome) return
            if (scrollWrapper.scrollTop < 50 && isTopEnd) setShowTimelineInformation(false)
            else setShowTimelineInformation(true)
        }

        if (!isTimeline) setShowTimelineInformation(false)

        document.addEventListener("scroll", handleScroll)
        return () => {
            document.removeEventListener("scroll", handleScroll)
        };
    });

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
            {showTimelineInformation && <TimelineInformationHeader/>}
        </>
    )
}
export default Navbar