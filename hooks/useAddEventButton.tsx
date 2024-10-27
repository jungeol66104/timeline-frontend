import {getIsTimelinePath} from "@/utils/global";
import {useEffect} from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectInformationContentType, updateShowTimelineTitleBar} from "@/store/slices/appearanceSlice";

const useAddEventButton = () => {
    const router = useRouter();

    const dispatch = useDispatch();
    const timelineContentType = useSelector(selectInformationContentType)

    useEffect(() => {
        const timelineTitle : HTMLDivElement | null = typeof window !== 'undefined' ? document.querySelector('.timelineTitle') : null

        if (!getIsTimelinePath(router.pathname)) {
            dispatch(updateShowTimelineTitleBar(false))
            return
        } else {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    const targetExists = document.body.contains(entry.target);
                    if (entry.isIntersecting || !targetExists) dispatch(updateShowTimelineTitleBar(false))
                    else dispatch(updateShowTimelineTitleBar(true))
                });
            }, {rootMargin: '-60px 0px 0px 0px'});

            if (timelineTitle) observer.observe(timelineTitle);
            else dispatch(updateShowTimelineTitleBar(false))
        }
    }, [router.pathname, timelineContentType]);
};

export default useAddEventButton;
