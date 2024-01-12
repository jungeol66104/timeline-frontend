import React, {ReactNode, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {selectIsSearch} from "@/store/slices/searchSlice";
import Search from "@/components/layout/search";
import Navbar from "@/components/layout/navbar";
// refactoring: clear

const Layout = ({ children } : {children: ReactNode}) => {
    const isSearch = useSelector(selectIsSearch)
    return (
        <div className={'layout pt-[60px]'}>
            <Navbar />
            <>{children}</>
            {isSearch && <Search />}
        </div>
    )
}
export default Layout
