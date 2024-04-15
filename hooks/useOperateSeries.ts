import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "@/utils/api";
import {debounce, getScrollWrapper} from "@/utils/global";
import {selectCurrentSeries, updateCurrentSeries} from "@/store/slices/contentsSlice";
import {selectAllTimelinesType, selectCurrentPage, updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";

const useOperateSeries = () => {
    const dispatch = useDispatch()
    const currentSeries = useSelector(selectCurrentSeries)
    const currentPage = useSelector(selectCurrentPage)
    const allTimelinesType = useSelector(selectAllTimelinesType)

    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        const fetchSeries = async () => {
            try {
                let newSeries: {id: number, name: string, description: string, timelineList: any[], totalPage:number} = {id: 0, name: "", description: "", timelineList: [], totalPage: 0}
                if (currentSeries.id === 0) {
                    const requestType = allTimelinesType === 'recent' ? 0 : 1
                    const response = await api.get(`/timeline?requestType=${requestType}&pageNum=${currentPage + 1}&pageSize=20`, {headers: {lang: 'en'}})
                    newSeries = response.data.data
                } else {
                    const response = await api.get(`/series/${currentSeries.id}?pageNum=${currentPage + 1}&pageSize=20`, {headers: {lang: 'en'}})
                    newSeries = response.data.data
                }
                return {...currentSeries, timelineList: [...new Set([...currentSeries.timelineList, ...newSeries.timelineList])]}
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error);
                return
            }
        }

        const operateScroll = async () => {
            if (currentSeries.totalPage === currentPage) return
            await fetchSeries().then((newCurrentSeries) => {
                dispatch(updateCurrentSeries(newCurrentSeries))
                dispatch(updateCurrentPage(currentPage + 1))
                dispatch(updateIsBottomEnd(newCurrentSeries.totalPage === currentPage + 1))
            })
        }

        const handleScroll = async () => {
            const scrollWrapper = getScrollWrapper()
            if (!scrollWrapper) return
            let scrollDown = scrollWrapper.scrollTop > scrollWrapper.scrollHeight - scrollWrapper.clientHeight - 150
            if (scrollDown) await operateScroll()
        }

        if (scrollWrapper.scrollHeight === scrollWrapper.clientHeight) handleScroll()
        scrollWrapper.addEventListener('scroll', () => debounce(handleScroll, 100))
        return () => {
            scrollWrapper.removeEventListener('scroll', () => debounce(handleScroll, 100))
        };
    });
}
export default useOperateSeries
