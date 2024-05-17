import {useEffect} from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";

const useInformationBarTest = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)

    useEffect(() => {
        const timelineInformationName : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timelineInformationName') : null
        const informationHeader : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.informationHeader') : null
        const informationHeaderName : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.informationHeaderName') : null
        if(!informationHeader || !informationHeaderName) return
        if (!timelineInformationName) {
            informationHeader.classList.remove("flex");
            informationHeader.classList.add("hidden");
            return
        }

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!informationHeader.classList.contains("hidden")) {
                        informationHeader.classList.remove("flex");
                        informationHeader.classList.add("hidden");
                    }
                } else {
                    if(!informationHeader.classList.contains("flex")) {
                        informationHeader.classList.remove("hidden");
                        informationHeader.classList.add("flex");
                    }
                }
            });
        }, {rootMargin: '-60px 0px 0px 0px'});

        informationHeaderName.innerHTML = currentTimeline.name
        observer.observe(timelineInformationName);
    });
};
export default useInformationBarTest;
