import React, {ReactNode, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsMaintenance, updateEventContentType, updateModalType} from "@/store/slices/appearanceSlice";
import useLoadingState from "@/hooks/useLoadingState";
import {useSession} from "@/hooks/useSession";
import {useDisableScroll, usePopupDisableScroll, useScroll} from "@/hooks/useScroll";
import Navbar from "@/components/layout/navbar/navbar";
import Footer from "@/components/layout/footer";
import Modals from "@/components/layout/modals";
import Popups from "@/components/layout/popups/popups";

const Layout = ({ children } : {children: ReactNode}) => {
    const isMaintenance = useSelector(selectIsMaintenance)
    const loadingState = useLoadingState()

    useSession()
    useDisableScroll()
    usePopupDisableScroll()
    // useScroll MUST COME LATER THAN ANY OTHER SCROLL ADJUSTING HOOKS
    useScroll()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(updateModalType('event'))
        dispatch(updateEventContentType('new'))
    });

    return (
        <div className={`layout relative ${isMaintenance ? '' : 'pt-[60px]'}`}>
            {!isMaintenance && <Navbar loadingState={loadingState}/>}
            {loadingState !== 'applying' && children}
            {loadingState !== 'applying' && <Footer />}
            <Modals />
            <Popups />
        </div>
    )
}

export default Layout;
