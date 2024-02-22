import {useEffect} from 'react';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";
import {getScrollWrapper} from "@/utils/global";

const useInformationHeader = () => {
    const router = useRouter();
    const isTimeline = router.pathname.startsWith('/timelines')
    const isTopEnd = useSelector(selectIsTopEnd)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const timelineInformationHeader : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timelineInformationHeader') : null
        if (!scrollWrapper || !timelineInformationHeader) return

        const handleScroll = () => {
            if ((scrollWrapper.scrollTop > 50 || !isTopEnd) && isTimeline) {
                if(!timelineInformationHeader.classList.contains("flex")) {
                    timelineInformationHeader.classList.remove("hidden");
                    timelineInformationHeader.classList.add("flex");
                }
            } else {
                if (!timelineInformationHeader.classList.contains("hidden")) {
                    timelineInformationHeader.classList.remove("flex");
                    timelineInformationHeader.classList.add("hidden");
                }
            }
        }

        handleScroll()
        scrollWrapper.addEventListener("scroll", handleScroll)
        return () => {
            scrollWrapper.removeEventListener("scroll", handleScroll)
        };
    });
};

export default useInformationHeader;
