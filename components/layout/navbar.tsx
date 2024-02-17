import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import { selectIsTopEnd} from "@/store/slices/appearanceSlice";
import SearchSVG from "@/public/svg/search.svg";
import CloseSVG from "@/public/svg/close.svg";
import MenuSVG from "@/public/svg/menu.svg";
import TimelineInformationHeader from "@/components/layout/timelineInformationHeader";
import ShareButton from "@/components/layout/share/shareButton";
import MobileNavbarControl from "@/components/layout/mobileNavbarControl";
import ComputerNavbarControl from "@/components/layout/computerNavbarControl";
// refactoring: clear

const Navbar = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const isTimeline = router.pathname.startsWith('/timelines')
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const isTopEnd = useSelector(selectIsTopEnd)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const [showTimelineInformation, setShowTimelineInformation] = useState(false)

    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return

        const handleScroll = () => {
            if (isHome) return
            if (scrollWrapper.scrollTop < 60 && isTopEnd) setShowTimelineInformation(false)
            else setShowTimelineInformation(true)
        }

        if (!isTimeline) setShowTimelineInformation(false)

        scrollWrapper.addEventListener("scroll", handleScroll)
        return () => {
            scrollWrapper.removeEventListener("scroll", handleScroll)
        };
    });

    return (
        <>
            <nav className={'navbar fixed top-[-30px] left-0 h-[90px] w-full bg-white pr-5 pl-5 shadow-md flex flex-col'} style={{zIndex: 5000}}>
                <div className={'h-[30px]'}></div>
                {/*<MobileNavbarControl />*/}
                <ComputerNavbarControl />
            </nav>
            {showTimelineInformation && <TimelineInformationHeader/>}
        </>
    )
}
export default Navbar