import React, {ReactNode} from "react";
import Search from "@/components/layout/search";
import Navbar from "@/components/layout/navbar";
import {useSelector} from "react-redux";
import {selectIsSearch} from "@/store/slices/searchSlice";
import {useRouter} from "next/router";
// refactoring: clear

const Layout = ({ children } : {children: ReactNode}) => {
    const router = useRouter();
    const isHome = router.pathname === '/';
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            { (isHome || isSearch) ? <Search /> : <></> }
        </div>
    )
}
export default Layout

