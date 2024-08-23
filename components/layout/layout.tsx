import React, {ReactNode, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Navbar from "@/components/layout/navbar/navbar";
import {selectIsMaintenance} from "@/store/slices/appearanceSlice";
import useStateToStorage from "@/hooks/useStateToStorage";
import useStateFromStorage from "@/hooks/useStateFromStorage";
import {useDisableScroll, useScroll} from "@/hooks/useScroll";
import {useRouter} from "next/router";
import IndexSkeleton from "@/components/index/indexSkeleton";
import Footer from "@/components/layout/footer";
import {useSession} from "@/hooks/useSession";
import Modals from "@/components/layout/modals";
import PopupOverlay from "@/components/layout/popupOverlay";

const Layout = ({ children } : {children: ReactNode}) => {
    const router = useRouter()
    const [isIndexPage, setIsIndexPage] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const isMaintenance = useSelector(selectIsMaintenance)

    useEffect(() => {
        const start = (url: string)=> {
            setIsLoading(true)
            setIsIndexPage(url.split('?')[0] === '/')
        }
        const end = () => setIsLoading(false)

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
    useSession()
    useDisableScroll()
    useScroll()

    return (
        <div className={`layout relative ${isMaintenance ? '' : 'pt-[60px]'}`}>
            {!isMaintenance && <Navbar isLoading={isLoading}/>}
            {isLoading
                ?   isIndexPage
                ?   <IndexSkeleton />
                :   <div></div>
                :   <>{children}<Footer /></>
            }
            <Modals />
            <PopupOverlay />
        </div>
    )
}

export default Layout;

declare global {
    interface Window {
        Kakao: any;

    }
}