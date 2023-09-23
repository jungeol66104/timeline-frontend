import {ReactNode, useState} from "react";
import Image from "next/image";
import Menu from "../public/svg/menu.svg"
import Search from "../public/svg/search.svg"

const Layout = ({ children } : {children: ReactNode}) => {
    const [title, setTitle] = useState('Timeline')

    return (
        <div className={'layout'}>
            <Navbar title={title}/>
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout

const Navbar = ({title} : {title: string}) => {
    return (
        <div className={'fixed top-0 left-0 h-[60px] w-full bg-white pr-5 pl-5 shadow-md flex items-center justify-between z-20'}>
            <div className={'font-black text-2xl'}>{title}</div>
            <div className={'flex items-center gap-2.5'}>
                <button><Image src={Search} alt={'search'} width={24} height={24} /></button>
                <button><Image src={Menu} alt={'menu'} width={24} height={24} /></button>
            </div>
        </div>
    )
}

const Footer = () => {
    return (
        <></>
    )
}