import {useSelector} from "react-redux";
import {selectScrollTop} from "@/store/slices/appearanceSlice";
import {useEffect} from "react";
import {getScrollWrapper} from "@/utils/global";

const useScrollSetup = () => {
    const scrollTop = useSelector(selectScrollTop)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return
        // trick for stopping momentum scroll error in webkit based browsers
        // scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        // scrollWrapper.style.overflowY = 'scroll'
    }, [scrollTop])
}
export default useScrollSetup