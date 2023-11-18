import React, {ReactNode, useEffect, useState} from "react";
import Image from "next/image";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import MenuSVG from "../public/svg/menu.svg"
import SearchSVG from "../public/svg/search.svg"
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import Search from "@/components/search";
import CloseSVG from "@/public/svg/close.svg";
import {selectCurrentEvents, selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectCurrentDepth} from "@/store/slices/appearanceSlice";
// refactoring: component separation

const Layout = ({ children } : {children: ReactNode}) => {
    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            <Search />
        </div>
    )
}

export default Layout

const Navbar = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentDepth = useSelector(selectCurrentDepth)

    const [isTitleNavbar, setIsTitleNavbar] = useState(false)
    let isEnd = true

    if (currentDepth === 2 && currentEvents.findIndex(cEvent => cEvent.id === 31) === -1) isEnd = false

    useEffect(() => {
        const scrollWrapper: HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.page') : null
        if (!scrollWrapper) return

        let scrollTop = scrollWrapper.scrollTop <= 60;

        const handleScroll = () => {
        }

        scrollWrapper.addEventListener('scroll', handleScroll)
        return () => {
            scrollWrapper.removeEventListener('scroll', handleScroll)
        }
    });

    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between'} style={{zIndex: 9999}}>
            <Link href={'/'} className={`font-black text-2xl transform transition-opacity ease-in-out duration-300`}>{isTitleNavbar && !isEnd ? currentTimeline.name : 'Timeline'}</Link>
            <div className={'flex items-center gap-2.5'}>
                <button onClick={() => dispatch(updateIsSearch())}>
                    {!isSearch ? <Image src={SearchSVG} alt={'search'} width={24} height={24} /> : <Image src={CloseSVG} alt={'close'} width={24} height={24} />}
                </button>
                <button className={'hidden'}><Image src={MenuSVG} alt={'menu'} width={24} height={24} /></button>
            </div>
        </div>
    )
}