import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentTimeline, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectIsBottomEnd, selectIsSummary, updateCurrentPage, updateIsBottomEnd, updateIsSummary, updateTotalPage} from "@/store/slices/appearanceSlice";
import {debounce, getScrollWrapper} from "@/utils/global";
import api from "@/pages/api/api";

const useOperateTimeline = () => {

    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentPage = useSelector(selectCurrentPage)
    const currentIsSummary = useSelector(selectIsSummary)
    const isBottomEnd = useSelector(selectIsBottomEnd)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        const toolbarButtons: NodeListOf<HTMLButtonElement> | null = typeof window !== 'undefined' ? document.querySelectorAll('.toolbarButton') : null
        if (!scrollWrapper || !toolbarButtons) return

        const fetchEvents = async (targetIsSummary: boolean) => {
            setIsLoading(true)
            try {
                let response
                if (targetIsSummary === currentIsSummary) response = await api.get(`/timeline/${currentTimeline.id}/paged?pageNum=${currentPage + 1}&pageSize=41&isSummary=${currentIsSummary}`, {headers: {lang: 'en'}})
                else response = await api.get(`/timeline/${currentTimeline.id}/paged?pageNum=1&pageSize=41&isSummary=${targetIsSummary}`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error)
                return
            } finally {
                setIsLoading(false)
            }
        }

        const operateZoom = (classNames: DOMTokenList) => {
            const targetIsSummary = classNames.contains('summary')

            fetchEvents(targetIsSummary).then((data) => {
                dispatch(updateCurrentEvents(data.events))
                dispatch(updateCurrentPage(1))
                dispatch(updateTotalPage(data.totalPages))
                dispatch(updateIsBottomEnd(data.totalPages === 1))
                dispatch(updateIsSummary(targetIsSummary))
            })
        }

        const operateScroll = () => {
            if (isBottomEnd) return

            fetchEvents(currentIsSummary).then((data) => {
                dispatch(updateCurrentEvents([...currentEvents, ...data.events]))
                dispatch(updateCurrentPage(currentPage + 1))
                dispatch(updateIsBottomEnd(data.totalPages === currentPage + 1))
            })
        }

        const handleClick = async (e: MouseEvent) => {
            if (isLoading) return
            const toolbarButton = e.currentTarget as HTMLButtonElement
            const classNames = toolbarButton.classList
            if (classNames.contains('uppermost')) {
                scrollWrapper.scrollTo({top: 0, behavior: 'smooth'})
            } else {
                operateZoom(classNames)
                // scrollWrapper.scrollTo({top: 0})
            }
        }

        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 200
            if (scrollDown) operateScroll()
        }

        toolbarButtons?.forEach(toolbarButton => toolbarButton.addEventListener('click', handleClick))
        window.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            toolbarButtons?.forEach(toolbarButton => toolbarButton.removeEventListener('click', handleClick))
            window.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
};

export default useOperateTimeline