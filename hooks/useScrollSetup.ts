import {useSelector} from "react-redux";
import {selectLastAction, selectScrollTop} from "@/store/slices/appearanceSlice";
import {useEffect, useLayoutEffect} from "react";
import {getScrollWrapper} from "@/utils/global";

const useScrollSetup = () => {
    let scrollTop = useSelector(selectScrollTop)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        // trick for stopping momentum scroll error in webkit based browsers
        scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        scrollWrapper.style.overflowY = 'scroll'
    }, [scrollTop])
}
export default useScrollSetup