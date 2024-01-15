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
import TimelineHeader from "@/components/timeline/timeilneHeader";
import ShareSVG from "@/public/svg/share.svg";
// refactoring: clear

const Navbar = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const isTopEnd = useSelector(selectIsTopEnd)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const [navbarTitle, setNavbarTitle] = useState('Timeline')

    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return

        const handleScroll = () => {
            if (isHome) return
            if (scrollWrapper.scrollTop < 60 && isTopEnd) setNavbarTitle('Timeline')
            else setNavbarTitle(currentTimeline.name)
        }

        if(scrollWrapper.scrollTop === 0) setNavbarTitle('Timeline')

        scrollWrapper.addEventListener("scroll", handleScroll)
        return () => {
            scrollWrapper.removeEventListener("scroll", handleScroll)
        };
    });

    return (
        <nav className={'navbar fixed top-0 left-1/2 transform -translate-x-1/2 h-[60px] w-full max-w-lg bg-white pr-5 pl-5 shadow-md flex items-center justify-between'} style={{zIndex: 5000}}>
            <Link onClick={() => sessionStorage.clear()} href={navbarTitle === 'Timeline' ? '/' : `/timelines/${currentTimeline.id}`} className={`relative w-fit font-black text-2xl transform transition-opacity ease-in-out duration-300`}>
                {navbarTitle === "Timeline"
                    ? navbarTitle
                    : <div className={'flex gap-2.5 items-center'}>
                        <div className={'text-2xl font-semibold'}>{currentTimeline.name}</div>
                        <div className={'w-[24px] h-[24px] top-0 right-0 mb-[0.5px]'}><Image className={'rounded-sm'} src={`/images/timeline/${currentTimeline.id}.png`} alt={`${currentTimeline.name}`} width={28} height={28} priority={true}/></div>
                        <div className={'cursor-pointer flex items-center pr-1 h-[24px] mb-[0.5px] rounded-sm bg-white border-[1px] drop-shadow-md '}>
                            <div className={'flex w-[24px] h-[24px] items-center justify-center pr-[1px]'}>
                                <Image src={ShareSVG} alt={'share'} width={14} height={14}/>
                            </div>
                            <div className={'text-xs font-semibold'}>공유</div>
                        </div>
                    </div>
                }
            </Link>
            <div className={'flex items-center gap-2.5'}>
                <button onClick={() => dispatch(updateIsSearch())}>
                    {!isSearch ? <Image src={SearchSVG} alt={'search'} width={24} height={24} /> : <Image src={CloseSVG} alt={'close'} width={24} height={24} />}
                </button>
                <button className={'hidden'}>
                    <Image src={MenuSVG} alt={'menu'} width={24} height={24} />
                </button>
            </div>
        </nav>
    )
}
export default Navbar