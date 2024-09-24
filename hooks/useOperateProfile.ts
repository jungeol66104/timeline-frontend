import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {debounce, getScrollWrapper} from "@/utils/global";
import {selectCurrentPageContributions, selectCurrentTimelines, updateCurrentPageContributions, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import {selectCurrentPage, selectTotalPage, updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";
import {selectProfileType} from "@/store/slices/privateSlice";
import axios from "axios";
import {useRouter} from "next/router";

const useOperateProfile = () => {
    const router = useRouter()

    const dispatch = useDispatch()
    const currentTimelines = useSelector(selectCurrentTimelines)
    const currentPageContributions = useSelector(selectCurrentPageContributions)
    const profileType = useSelector(selectProfileType)
    const currentPage = useSelector(selectCurrentPage)
    const totalPage = useSelector(selectTotalPage)
    const query = router.query.user?.slice(1) as string


    useEffect(() => {
        const scrollWrapper = getScrollWrapper()
        if (!scrollWrapper) return

        const fetchCollection = async () => {
            try {
                const type = profileType === 'contributions' ? 0 : 1
                const response = await axios.get(`/api/user/profile?type=${type}&user=${query}&pageNum=${currentPage + 1}`)
                console.log(response.data)
                return response.data
            } catch (error) {
                console.error('Error fetching data in useEffect: ', error);
                return
            }
        }


        const operateScroll = async () => {
            if (totalPage <= currentPage) return
            await fetchCollection().then((data) => {
                const type = profileType === 'contributions' ? 0 : 1
                if (type === 0) dispatch(updateCurrentPageContributions([...currentPageContributions, ...data.aboutPageInfoList]))
                else dispatch(updateCurrentTimelines([...currentTimelines, ...data.aboutPageInfoList]))
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
export default useOperateProfile
