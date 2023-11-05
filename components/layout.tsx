import {ReactNode} from "react";
import Image from "next/image";
import Link from 'next/link'
import { useDispatch, useSelector } from "react-redux";
import MenuSVG from "../public/svg/menu.svg"
import SearchSVG from "../public/svg/search.svg"
import Search from "./search"
import { updateIsSearch } from "@/store/slices/searchSlice";
import {selectCurrentEvents, selectCurrentTimeline} from "@/store/slices/eventsSlice";

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
    const currentTimeline = useSelector(selectCurrentTimeline)

    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between z-30'}>
            {/*<span className={`absolute top-3.5 font-black text-2xl transform transition-opacity ease-in-out duration-300 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>{title}</span>*/}
            {/*<Link href={'/'} className={`${!showTitle ? '' : 'pointer-events-none'} font-black text-2xl transform transition-opacity ease-in-out duration-300 ${!showTitle ? 'opacity-100' : 'opacity-0'}`}>Timeline</Link>*/}
            <Link href={'/'} className={`font-black text-2xl transform transition-opacity ease-in-out duration-300`}>Timeline</Link>
            <div className={'flex items-center gap-2.5'}>
                {/*<Link href={`/timelines/${currentTimeline.id}`} className={'font-medium text-lg text-gray-500 pt-[1.5px]'}>#{currentTimeline.name}</Link>*/}
                <button><Image src={SearchSVG} alt={'search'} width={24} height={24} onClick={() => dispatch(updateIsSearch())}/></button>
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