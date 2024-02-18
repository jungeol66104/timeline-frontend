import {useSelector} from "react-redux";
import {selectScrollTop} from "@/store/slices/appearanceSlice";
import {useEffect} from "react";

const useScrollSetup = () => {
    const scrollTop = useSelector(selectScrollTop)

    useEffect(() => {
        const scrollWrapper: HTMLElement | null = typeof window !== 'undefined' ? document.documentElement : null
        if (!scrollWrapper) return
        // trick for stopping momentum scroll error in webkit based browsers
        scrollWrapper.style.overflowY = 'hidden'
        scrollWrapper.scrollTop = scrollTop
        scrollWrapper.style.overflowY = 'auto'
    })
}
export default useScrollSetup