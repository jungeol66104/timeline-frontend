import api from "@/pages/api/api";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {debounce, getScrollWrapper} from "@/utils/global";
import {selectCurrentPageContributions, updateCurrentPageContributions} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectTotalPage, updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";

const useOperateHistories = () => {
    const dispatch = useDispatch()
    const currentPageContributions = useSelector(selectCurrentPageContributions)
    const currentPage = useSelector(selectCurrentPage)
    const totalPage = useSelector(selectTotalPage)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        const fetchHistories = async () => {
            try {
                const response = await api.get(`/history?pageNum=${currentPage + 1}&pageSize=20`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error);
                return
            }
        }

        const operateScroll = async () => {
            if (totalPage <= currentPage) return
            await fetchHistories().then((data) => {
                dispatch(updateCurrentPageContributions([...currentPageContributions, ...data.histories]))
                dispatch(updateCurrentPage(currentPage + 1))
                dispatch(updateIsBottomEnd(data.totalPage === currentPage + 1))
            })
        }

        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return

            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 150
            if (scrollDown) await operateScroll()
        }

        if (scrollWrapper.scrollHeight === scrollWrapper.clientHeight) handleScroll()

        const debouncedHandleScroll = () => debounce(handleScroll, 100);
        window.addEventListener('scroll', debouncedHandleScroll)
        return () => {
            window.removeEventListener('scroll', debouncedHandleScroll)
        };
    });
}
export default useOperateHistories
