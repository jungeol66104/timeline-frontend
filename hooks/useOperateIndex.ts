import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "@/pages/api/api";
import {debounce, getScrollWrapper} from "@/utils/global";
import {selectCurrentTimelines, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectTagNum, selectTotalPage, updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";

const useOperateIndex = () => {
    const dispatch = useDispatch()
    const currentTimelines = useSelector(selectCurrentTimelines)
    const currentPage = useSelector(selectCurrentPage)
    const tagNum = useSelector(selectTagNum)
    const totalPage = useSelector(selectTotalPage)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        const fetchTimelines = async () => {
            try {
                const type = tagNum < 4 ? 'features' : 'tags'
                const id = tagNum < 4 ? tagNum : tagNum - 3
                const response = await api.get(`/timeline/${type}/${id}?pageNum=${currentPage + 1}&pageSize=20`, {headers: {lang: 'en'}})
                return response.data.data
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error);
                return
            }
        }

        const operateScroll = async () => {
            if (totalPage === currentPage) return
            await fetchTimelines().then((data) => {
                dispatch(updateCurrentTimelines([...currentTimelines, ...data.timelineList]))
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
        window.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            window.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
}
export default useOperateIndex
