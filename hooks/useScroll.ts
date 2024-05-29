import {useLayoutEffect} from 'react';
import {useSelector} from "react-redux";
import {selectScrollTop} from "@/store/slices/appearanceSlice";
import {getScrollWrapper} from "@/utils/global";

export const useScroll = () => {
    const scrollTop = useSelector(selectScrollTop)

    useLayoutEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return
        scrollWrapper.scrollTop = scrollTop
    });
}