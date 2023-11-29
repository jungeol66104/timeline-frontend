import React, {ReactNode} from "react";
import Search from "@/components/layout/search";
import Navbar from "@/components/layout/navbar";
import {useSelector} from "react-redux";
import {selectIsSearch} from "@/store/slices/searchSlice";
// refactoring: clear

const Layout = ({ children } : {children: ReactNode}) => {
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            { isSearch ? <Search /> : <></> }
        </div>
    )
}
export default Layout

