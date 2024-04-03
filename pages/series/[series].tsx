import api from "@/utils/api"
import React from "react";
import {storeWrapper} from "@/store/store";
import {selectCurrentSeries, SeriesTimeline, updateCurrentSeries} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import {updateCurrentPage, updateIs404, updateIsBottomEnd} from "@/store/slices/appearanceSlice";
import {useSelector} from "react-redux";
import SeriesCard from "@/components/series/seriesCard";
import SeriesBottom from "@/components/series/seriesBottom";
import useOperateSeries from "@/hooks/useOperateSeries";

export const getStaticPaths = async () => {
    const response = await api.get('/series', {headers: {lang: 'en'}})
    const serieses: any[] = response.data.data
    const seriesIds = serieses.map(series => series.id)
    const paths = seriesIds.map(seriesId => ({ params: {series: String(seriesId) }}))
    return {paths, fallback: 'blocking'}
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({params}) => {
    try {
        const response = await api.get(`/series/${Number(params?.series)}?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        let newCurrentSeries = response.data.data
        store.dispatch(updateCurrentSeries({...newCurrentSeries, id: Number(params?.series)}))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateIsBottomEnd(newCurrentSeries.totalPage === 1))
        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}, revalidate: 10}
    }
})

const SeriesPage = () => {
    const currentSeries = useSelector(selectCurrentSeries)
    const timelines: SeriesTimeline[] = currentSeries.timelineList

    useOperateSeries()

    return (
        <>
            <DynamicHead type={'series'}/>
            <div className={'page seriesPage pt-5 items-center'}>
                <div className={'seriesHeader w-full pl-4'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'text-2xl font-bold'}>{currentSeries.name}</div>
                    </div>
                </div>
                <div className={'seriesBody w-full mt-2.5 px-4 grid grid-cols-5 gap-4'}>
                    {timelines.map((timeline, i) => {
                        return <SeriesCard key={i} timeline={timeline}/>
                    })}
                </div>
                <SeriesBottom />
            </div>
        </>
    )
}
export default SeriesPage
