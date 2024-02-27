import api from "@/utils/api"
import React from "react";
import {storeWrapper} from "@/store/store";
import {selectCurrentSeries, selectCurrentTimelines, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import {updateIs404} from "@/store/slices/appearanceSlice";
import {useSelector} from "react-redux";
import SeriesCard from "@/components/series/seriesCard";
// refactoring: clear


export const getStaticPaths = async () => {
    const response = await api.get('/series', {headers: {lang: 'en'}})
    const serieses: any[] = response.data.data
    const seriesIds = serieses.map(series => series.id)
    const paths = seriesIds.map(seriesId => ({ params: {series: String(seriesId) }}))
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = storeWrapper.getStaticProps((store) => async ({params}) => {
    try {
        // const response = await api.get(`/series/${Number(params?.series)}`, {headers: {lang: 'en'}})
        const response = await api.get('/timeline', {headers: {lang: 'en'}})
        if (response.data.code === 69999) store.dispatch(updateIs404(true))
        let newCurrentTimelines = response.data.data.slice(0,20)
        store.dispatch(updateCurrentTimelines(newCurrentTimelines))
        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

const SeriesPage = () => {
    const series = {name: 'All Timelines', description: ''}
    const currentTimelines = useSelector(selectCurrentTimelines)
    const currentSeries = useSelector(selectCurrentSeries)

    return (
        <>
            <DynamicHead type={'series'}/>
            <div className={'page seriesPage pt-5 items-center'}>
                <div className={'seriesHeader w-full pl-4'}>
                    <div className={'flex items-center justify-between'}>
                        <div className={'text-2xl font-bold'}>{series.name}</div>
                    </div>
                </div>
                <div className={'seriesBody w-full mt-2.5 px-4 grid grid-cols-5 gap-4'}>
                    {currentTimelines.map((timeline, i) => {
                        return <SeriesCard key={i} timeline={timeline}/>
                    })}
                </div>
                <div className={'w-full mt-2.5 h-[60px] shrink-0 flex justify-center items-center'}>
                    <div className={'ml-[22px] text-sm text-center italic pb-[10px]'}>
                        End of the Series<br/>
                        <b>{currentSeries.name}</b>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SeriesPage
