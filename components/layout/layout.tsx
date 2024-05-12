import React, {ReactNode, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Navbar from "@/components/layout/navbar";
import Share from "@/components/layout/share/share";
import Overlay from "@/components/layout/overlay";
import {selectIs404} from "@/store/slices/appearanceSlice";
import Custom404 from "@/pages/404";
import useStateToStorage from "@/hooks/useStateToStorage";
import useStateFromStorage from "@/hooks/useStateFromStorage";
import {useScroll} from "@/hooks/useScroll";
import {useRouter} from "next/router";
import IndexSkeleton from "@/components/index/indexSkeleton";

const Layout = ({ children } : {children: ReactNode}) => {
    const is404 = useSelector(selectIs404)
    const router = useRouter()
    const [isIndexPage, setIsIndexPage] = useState(true);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const start = (url: string)=> {
            setLoading(true)
            setIsIndexPage(url.split('?')[0] === '/')
        }
        const end = () => setLoading(false)

        router.events.on("routeChangeStart", start)
        router.events.on("routeChangeComplete", end)
        router.events.on("routeChangeError", end)
        return () => {
            router.events.off("routeChangeStart", start)
            router.events.off("routeChangeComplete", end)
            router.events.off("routeChangeError", end)
        };
    }, []);

    useStateFromStorage()
    useStateToStorage()
    useScroll()

    if (is404) return <Custom404 />
    return (
        <div className={'layout relative'}>
            <Navbar />
            {loading
                ?   isIndexPage
                    ?   <IndexSkeleton />
                    :   <div></div>
                :   <>{children}</>
            }
            <Share />
            <Overlay />
        </div>
    )
}
export default Layout
