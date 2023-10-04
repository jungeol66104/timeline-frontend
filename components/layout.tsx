import Image from "next/image";
import Link from 'next/link'
import { ReactNode, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateIsSearch } from "@/store/slices/searchSlice";
import MenuSVG from "../public/svg/menu.svg"
import SearchSVG from "../public/svg/search.svg"
import Search from "./search"

const Layout = ({ children } : {children: ReactNode}) => {
    //state
    const [title, setTitle] = useState('Timeline')

    return (
        <div className={'layout'}>
            <Navbar title={title} />
            <>{children}</>
            <Footer />
            <Search />
        </div>
    )
}

export default Layout

const Navbar = ({title} : {title: string}) => {
    const dispatch = useDispatch()

    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between z-30'}>
            <Link href={'/'} className={'font-black text-2xl'}>{title}</Link>
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