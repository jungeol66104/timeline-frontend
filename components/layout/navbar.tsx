import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import { selectIsTopEnd} from "@/store/slices/appearanceSlice";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import SearchSVG from "@/public/svg/search.svg";
import CloseSVG from "@/public/svg/close.svg";
import MenuSVG from "@/public/svg/menu.svg";
import {useRouter} from "next/router";
// refactoring: clear

const Navbar = () => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const isTopEnd = useSelector(selectIsTopEnd)
    const [navbarTitle, setNavbarTitle] = useState('Timeline')


    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return

        const handleScroll = () => {
            if ((scrollWrapper.scrollTop < 60 && isTopEnd) || isSearch) {
                setNavbarTitle('Timeline')
            } else setNavbarTitle(currentTimeline.name)
        }

        scrollWrapper.addEventListener("scroll", handleScroll)
        return () => {
            scrollWrapper.removeEventListener("scroll", handleScroll)
        };
    });



    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between'} style={{zIndex: 9999}}>
            <Link href={navbarTitle === 'Timeline' ? '/' : `/timelines/${currentTimeline.id}`} className={`font-black text-2xl transform transition-opacity ease-in-out duration-300`}>{navbarTitle}</Link>
            <div className={'flex items-center gap-2.5'}>
                <button onClick={() => dispatch(updateIsSearch())}>
                    {!isHome ? !isSearch ? <Image src={SearchSVG} alt={'search'} width={24} height={24} /> : <Image src={CloseSVG} alt={'close'} width={24} height={24} /> : <></> }
                </button>
                <button className={'hidden'}>
                    <Image src={MenuSVG} alt={'menu'} width={24} height={24} />
                </button>
            </div>
        </div>
    )
}
export default Navbar