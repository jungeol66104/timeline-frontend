import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import { selectIsTopEnd} from "@/store/slices/appearanceSlice";
import TimelineInformationHeader from "@/components/layout/timelineInformationHeader";
import ComputerNavbarControl from "@/components/layout/computerNavbarControl";
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
            if (scrollWrapper.scrollTop < 60 && isTopEnd) setShowTimelineInformation(false)
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
            <nav className={'navbar fixed top-[-30px] left-0 h-[90px] w-full bg-white pr-5 pl-5 shadow-md flex flex-col'} style={{zIndex: 5000}}>
                <div className={'h-[30px] w-full bg-white'}></div>
                {/*<MobileNavbarControl />*/}
                <ComputerNavbarControl />
            </nav>
            {showTimelineInformation && <TimelineInformationHeader/>}
        </>
    )
}
export default Navbar