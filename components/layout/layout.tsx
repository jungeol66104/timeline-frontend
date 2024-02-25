import React, {ReactNode} from "react";
import {useSelector} from "react-redux";
import Navbar from "@/components/layout/navbar";
import Share from "@/components/layout/share/share";
import Overlay from "@/components/layout/overlay";
import {selectIs404} from "@/store/slices/appearanceSlice";
import Custom404 from "@/pages/404";
// refactoring: clear

const Layout = ({ children } : {children: ReactNode}) => {
    const is404 = useSelector(selectIs404)
    if (is404) return <Custom404 />

    return (
        <div className={'layout relative'}>
            <Navbar />
            <>{children}</>
            <Share />
            <Overlay />
        </div>
    )
}
export default Layout
