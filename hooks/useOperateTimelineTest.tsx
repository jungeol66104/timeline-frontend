import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentEventsDraft, selectCurrentTimeline, TimelineEvent, updateCurrentEvents, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectIsBottomEnd, selectIsSummary, updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";
import {debounce, getScrollWrapper} from "@/utils/global";
import {fetchEvents} from "@/pages/api/global";

const useOperateTimelineTest = () => {
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)
    const currentPage = useSelector(selectCurrentPage)
    const currentIsKeynote = useSelector(selectIsSummary)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    useEffect(() => {
        const operateScroll = () => {
            if (isBottomEnd) return

            fetchEvents(currentTimeline.id, currentPage + 1, currentIsKeynote).then((data) => {
                const events = data.events
                events.forEach((event: TimelineEvent) => event.keynote = 1)
                dispatch(updateCurrentEvents([...currentEvents, ...events]))
                dispatch(updateCurrentEventsDraft([...currentEventsDraft, ...events]))
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
