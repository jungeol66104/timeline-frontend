import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {selectIsSearch} from "@/store/slices/searchSlice";
import Search from "@/components/layout/search";
import Navbar from "@/components/layout/navbar";
// refactoring: clear

const Layout = ({ children } : {children: ReactNode}) => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            { (isSearch) ? <Search /> : <></> }
        </div>
    )
}
export default Layout
