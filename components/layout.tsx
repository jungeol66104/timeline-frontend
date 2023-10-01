import {Dispatch, EventHandler, ReactNode, SetStateAction, useState} from "react";
import Image from "next/image";
import MenuSVG from "../public/svg/menu.svg"
import SearchSVG from "../public/svg/search.svg"
import Search from "./search"

const Layout = ({ children } : {children: ReactNode}) => {
    const [title, setTitle] = useState('Timeline')
    const [isSearch, setIsSearch] = useState(false)

    const handleIsSearch = () => {
        setIsSearch(!isSearch)
    }

    return (
        <div className={'layout'}>
            <Navbar title={title} handleIsSearch={handleIsSearch}/>
            <>{children}</>
            <Footer />
            {isSearch && <Search handleIsSearch={handleIsSearch}/>}
        </div>
    )
}

export default Layout

const Navbar = ({title, handleIsSearch} : {title: string, handleIsSearch: () => void}) => {
    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between z-30'}>
            <div className={'font-black text-2xl'}>{title}</div>
            <div className={'flex items-center gap-2.5'}>
                <button><Image src={SearchSVG} alt={'search'} width={24} height={24} onClick={handleIsSearch} /></button>
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