import {useEffect} from 'react';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";
import {getScrollWrapper} from "@/utils/global";
import {selectCurrentSeries, selectCurrentTimeline} from "@/store/slices/contentsSlice";

const useInformationBar = () => {
    const router = useRouter();
    const isTimeline = router.pathname.startsWith('/timelines')
    const currentTimeline = useSelector(selectCurrentTimeline)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const informationHeader : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.informationHeader') : null
        const informationHeaderName : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.informationHeaderName') : null
        if (!scrollWrapper || !informationHeader || !informationHeaderName) return

        const handleScroll = () => {
            if (scrollWrapper.scrollTop > 50 && isTimeline) {
                if(!informationHeader.classList.contains("flex")) {
                    informationHeader.classList.remove("hidden");
                    informationHeader.classList.add("flex");
                }
            } else {
                if (!informationHeader.classList.contains("hidden")) {
                    informationHeader.classList.remove("flex");
                    informationHeader.classList.add("hidden");
                }
            }
        }

        informationHeaderName.innerHTML = currentTimeline.name
        handleScroll()
        scrollWrapper.addEventListener("scroll", handleScroll)
        return () => {
            scrollWrapper.removeEventListener("scroll", handleScroll)
        };
    });
};

export default useInformationBar;
