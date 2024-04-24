import api from "@/utils/api"
import React from "react";
import {storeWrapper} from "@/store/store";
import {selectCurrentSeries, SeriesTimeline, updateCurrentSeries} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import {selectAllTimelinesType, updateAllTimelinesType, updateCurrentPage, updateIs404, updateIsBottomEnd} from "@/store/slices/appearanceSlice";
import {useDispatch, useSelector} from "react-redux";
import SeriesCard from "@/_deprecated/seriesCard";
import SeriesBottom from "@/_deprecated/seriesBottom";
import useOperateSeries from "@/_deprecated/useOperateSeries";
import AllTimelinesTypeButtons from "@/_deprecated/allTimelinesTypeButtons";

export const getStaticPaths = async () => {
    return {paths: [], fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({params}) => {
    try {
        let series: {id: number, name: string, description: string, timelineList: any[], totalPage:number} = {id: 0, name: "", description: "", timelineList: [], totalPage: 0}
        if (isNaN(Number(params?.series))) {
            const requestType = params?.series === 'recent' ? 0 : 1
            const allTimelinesType = params?.series
            const response = await api.get(`/timeline?requestType=${requestType}&pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            series = {...response.data.data, name: "All Timelines", description: "", id: 0}
            store.dispatch(updateAllTimelinesType(allTimelinesType))
        } else {
            const response = await api.get(`/series/${Number(params?.series)}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) store.dispatch(updateIs404(true))
            series = {...response.data.data, id: Number(params?.series)}
        }
        store.dispatch(updateCurrentSeries(series))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateIsBottomEnd(series.totalPage === 1))
        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const SeriesPage = () => {
    const dispatch = useDispatch()
    const allTimelinesType = useSelector(selectAllTimelinesType)
    const currentSeries = useSelector(selectCurrentSeries)
    const timelines: SeriesTimeline[] = currentSeries.timelineList

    useOperateSeries()

    return (
        <>
            <DynamicHead type={'series'}/>
            <div className={'page seriesPage items-center'}>
                <div className={'seriesHeader flex flex-col gap-2.5 w-full py-4 pl-4'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'text-2xl font-bold'}>{currentSeries.name}</div>
                    </div>
                    {currentSeries.id === 0 &&  <AllTimelinesTypeButtons />}
                </div>
                <div className={'seriesBody w-full px-4 grid grid-cols-5 gap-4'}>
                    {timelines.map((timeline, i) => {
                        return <SeriesCard key={i} timeline={timeline}/>
                    })}
                </div>
                <SeriesBottom/>
            </div>
        </>
    )
}
export default SeriesPage
