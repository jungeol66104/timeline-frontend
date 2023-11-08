import React, {ReactNode, useEffect} from "react";
import Image from "next/image";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import MenuSVG from "../public/svg/menu.svg"
import SearchSVG from "../public/svg/search.svg"
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {selectCurrentEvents, selectCurrentTimeline} from "@/store/slices/contentsSlice";
import SearchTest from "@/components/searchTest";
import CloseSVG from "@/public/svg/close.svg";
// refactoring: needed

const Layout = ({ children } : {children: ReactNode}) => {
    const dispatch = useDispatch()



    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            <Footer />
            <SearchTest />
        </div>
    )
}

export default Layout

const Navbar = () => {
    const dispatch = useDispatch()
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between'} style={{zIndex: 9999}}>
            <Link href={'/'} className={`font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
            <div className={'flex items-center gap-2.5'}>
                <button onClick={() => dispatch(updateIsSearch())}>
                    {!isSearch ? <Image src={SearchSVG} alt={'search'} width={24} height={24} /> : <Image src={CloseSVG} alt={'close'} width={24} height={24} />}
                </button>
                <button className={'hidden'}><Image src={MenuSVG} alt={'menu'} width={24} height={24} /></button>
            </div>
        </div>
    )
}
const Footer = () => {
    return (
        <div className={'hidden fixed flex flex-col items-center bottom-0 w-full bg-white border-t-[1px] p-2.5'}>
            <div className={'text-center font-semibold'}></div>
            <div className={'text-[10px] text-center'}>© 2023 Timeline. All rights reserved.</div>
        </div>
    )
}