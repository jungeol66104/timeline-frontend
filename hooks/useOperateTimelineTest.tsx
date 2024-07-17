import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentTimeline, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectIsBottomEnd, selectIsSummary, updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";
import {debounce, getScrollWrapper} from "@/utils/global";
import api from "@/pages/api/api";

const useOperateTimelineTest = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentPage = useSelector(selectCurrentPage)
    const currentIsKeynote = useSelector(selectIsSummary)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get(`/timeline/${currentTimeline.id}/paged?pageNum=${currentPage + 1}&pageSize=41&isSummary=${currentIsKeynote}`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error)
                return
            }
        }

        const operateScroll = () => {
            if (isBottomEnd) return

            fetchEvents().then((data) => {
                dispatch(updateCurrentEvents([...currentEvents, ...data.events]))
                dispatch(updateCurrentPage(currentPage + 1))
                dispatch(updateIsBottomEnd(data.totalPages === currentPage + 1))
            })
        }

        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 200
            if (scrollDown) operateScroll()
        }

        window.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            window.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
};

export default useOperateTimelineTest
