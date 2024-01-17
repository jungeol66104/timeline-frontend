import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import {selectIsSearch} from "@/store/slices/searchSlice";
import Search from "@/components/layout/search/search";
import Navbar from "@/components/layout/navbar";
import Share from "@/components/layout/share/share";
import Overlay from "@/components/layout/overlay";
import {selectIsShare} from "@/store/slices/appearanceSlice";
// refactoring: clear

const Layout = ({ children } : {children: ReactNode}) => {
    const isSearch = useSelector(selectIsSearch)

    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            {isSearch && <Search />}
            <Share />
            <Overlay />
        </div>
    )
}
export default Layout
