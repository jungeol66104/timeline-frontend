import {useEffect} from 'react';
import {useRouter} from "next/router";
import {useSelector} from "react-redux";
import {selectIsTopEnd} from "@/store/slices/appearanceSlice";

const useInformationHeader = () => {
    const router = useRouter();
    const isTimeline = router.pathname.startsWith('/timelines')
    const isTopEnd = useSelector(selectIsTopEnd)

    useEffect(() => {
        const scrollWrapper: HTMLElement | null = typeof window !== 'undefined' ? document.documentElement : null
        const timelineInformationHeader : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timelineInformationHeader') : null
        if (!scrollWrapper || !timelineInformationHeader) return
        if (!isTimeline) return

        const handleScroll = () => {
            if (scrollWrapper.scrollTop > 50 || !isTopEnd) {
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

        document.addEventListener("scroll", handleScroll)
        return () => {
            document.removeEventListener("scroll", handleScroll)
        };
    });
};

export default useInformationHeader;
