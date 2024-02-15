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
                <div className={'h-[60px] w-full flex items-center justify-between'}>
                    <Link onClick={() => sessionStorage.clear()} href={'/'} className={`w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
                    <div className={'flex items-center gap-2.5'}>
                        <ShareButton />
                        <Link href={'https://docs.google.com/forms/d/e/1FAIpQLScN4ooRXZylBgKtElHSJi7m739iHHSMNg4QfbAcDx0v0OjwnA/viewform?usp=sf_link'} target="_blank" className={'cursor-pointer flex items-center pr-[6px] h-[24px] mb-[0.5px] rounded-sm bg-white border-[0.1px] shadow-[0_2px_3px_rgba(0,0,0,0.07)]'}>
                                <div className={'flex w-[24px] h-[24px] items-center justify-center'}>
                                    <Image src={'/svg/feedback.svg'} alt={'feedback'} width={14} height={14}/>
                                </div>
                                <div className={'text-xs font-semibold'}>Feedback</div>
                        </Link>
                        <button onClick={() => dispatch(updateIsSearch())}>
                            {!isSearch ? <Image src={SearchSVG} alt={'search'} width={24} height={24} /> : <Image src={CloseSVG} alt={'close'} width={24} height={24} />}
                        </button>
                        <button className={'hidden'}>
                            <Image src={MenuSVG} alt={'menu'} width={24} height={24} />
                        </button>
                    </div>
                </div>
            </nav>
            {showTimelineInformation && <TimelineInformationHeader/>}
        </>
    )
}
export default Navbar