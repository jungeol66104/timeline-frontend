import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentTimeline, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectIsBottomEnd, selectIsSummary, updateCurrentPage, updateIsBottomEnd, updateIsSummary, updateLastAction} from "@/store/slices/appearanceSlice";
import {debounce, getScrollWrapper} from "@/utils/global";
import api from "@/utils/api";

const useOperateTimeline = () => {

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentPage = useSelector(selectCurrentPage)
    const currentIsSummary = useSelector(selectIsSummary)
    const isBottomEnd = useSelector(selectIsBottomEnd)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const toolbarButtons: NodeListOf<HTMLButtonElement> | null = typeof window !== 'undefined' ? document.querySelectorAll('.toolbarButton') : null
        if (!scrollWrapper || !toolbarButtons) return

        const fetchEvents = async (isSummary: boolean) => {
            try {
                let response
                if (isSummary === currentIsSummary) response = await api.get(`/timeline/${currentTimeline.id}/paged?pageNum=${currentPage + 1}&pageSize=41&isSummary=${currentIsSummary}`, {headers: {lang: 'en'}})
                else response = await api.get(`/timeline/${currentTimeline.id}/paged?pageNum=1&pageSize=41&isSummary=${isSummary}`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error)
                return
            }
        }

        const operateZoom = async (classNames: DOMTokenList) => {
            const isSummary = classNames.contains('summary')

            fetchEvents(isSummary).then((data) => {
                dispatch(updateCurrentEvents(data.events))
                dispatch(updateCurrentPage(1))
                dispatch(updateIsBottomEnd(data.totalPages === 1))
                dispatch(updateLastAction('zoom'))
                dispatch(updateIsSummary(isSummary))
            })
        }

        const operateScroll = async () => {
            if (isBottomEnd) return

            await fetchEvents(currentIsSummary).then((data) => {
                dispatch(updateCurrentEvents([...currentEvents, ...data.events]))
                dispatch(updateCurrentPage(currentPage + 1))
                dispatch(updateIsBottomEnd(data.totalPages === currentPage + 1))
                dispatch(updateLastAction('scroll'))
            })
        }

        const handleClick = async (e: MouseEvent) => {
            const toolbarButton = e.currentTarget as HTMLButtonElement
            const classNames = toolbarButton.classList
            if (classNames.contains('uppermost')) {
                scrollWrapper.scrollTo({top: 0, behavior: 'smooth'})
            } else {
                await operateZoom(classNames)
                scrollWrapper.scrollTo({top: 0})
            }
        }

        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 200
            if (scrollDown) await operateScroll()
        }

        toolbarButtons?.forEach(toolbarButton => toolbarButton.addEventListener('click', handleClick))
        scrollWrapper.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            toolbarButtons?.forEach(toolbarButton => toolbarButton.removeEventListener('click', handleClick))
            scrollWrapper.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
};

export default useOperateTimeline
