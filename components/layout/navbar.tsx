import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {selectIsMobileSize, selectIsTopEnd, updateIsMobileSize} from "@/store/slices/appearanceSlice";
import TimelineInformationHeader from "@/components/layout/timelineInformationHeader";
import ComputerNavbarControl from "@/components/layout/computerNavbarControl";
import MobileNavbarControl from "@/components/layout/mobileNavbarControl";
// refactoring: clear

const Navbar = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const isTimeline = router.pathname.startsWith('/timelines')
    const isTopEnd = useSelector(selectIsTopEnd)
    const [isMobileSize, setIsMobileSize] = useState(false)
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

    useEffect(() => {
        const handleResize = () => {
            setIsMobileSize(window.innerWidth < 850); // Set isMobile based on window width
        };

        handleResize(); // Call handleResize to set initial state
        window.addEventListener('resize', handleResize); // Listen for window resize events
        return () => {
            window.removeEventListener('resize', handleResize); // Clean up event listener on component unmount
        };
    });

    return (
        <>
            <nav className={'navbar sticky top-0 left-0 h-[60px] w-full bg-white shadow-md flex flex-col'} style={{zIndex: 5000}}>
                {isMobileSize
                    ?   <MobileNavbarControl isMobileSize={isMobileSize}/>
                    :   <ComputerNavbarControl />
                }
            </nav>
            {showTimelineInformation && <TimelineInformationHeader/>}
        </>
    )
}
export default Navbar