import Image from "next/image";
import Link from 'next/link'
import React, {ReactNode, RefObject, useRef, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsSearch } from "@/store/slices/searchSlice";
import MenuSVG from "../public/svg/menu.svg"
import SearchSVG from "../public/svg/search.svg"
import Search from "./search"
import {RootState} from "@/store/store";

const Layout = ({ children } : {children: ReactNode}) => {
    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            <Footer />
            <Search />
        </div>
    )
}

export default Layout

const Navbar = () => {
    const dispatch = useDispatch()
    const showTitle = useSelector((state: RootState) => state.reducer.layout.showTitle)
    const title = useSelector((state:RootState) => state.reducer.layout.title)

    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between z-30'}>
            <span className={`absolute top-3.5 font-black text-2xl transform transition-opacity ease-in-out duration-300 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>{title}</span>
            <Link href={'/'} className={`${!showTitle ? '' : 'pointer-events-none'} font-black text-2xl transform transition-opacity ease-in-out duration-300 ${!showTitle ? 'opacity-100' : 'opacity-0'}`}>Timeline</Link>
            <div className={'flex items-center gap-2.5'}>
                <button><Image src={SearchSVG} alt={'search'} width={24} height={24} onClick={() => dispatch(updateIsSearch())}/></button>
                <button><Image src={MenuSVG} alt={'menu'} width={24} height={24} /></button>
            </div>
        </div>
    )
}

const Footer = () => {
    return (
        <></>
    )
}