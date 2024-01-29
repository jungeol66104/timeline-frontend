import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/swiper";
import {allTimelines} from "@/utils/global"
import {storeWrapper} from "@/store/store";
import RequestTimelineForm from "@/components/requestTimelineForm";
import api from "@/utils/api";
import {selectCurrentSeries, updateCurrentSeries} from "@/store/slices/contentsSlice";
import {useSelector} from "react-redux";
// refactoring: clear


export const getStaticProps = storeWrapper.getStaticProps((store) => async (context) => {
    try {
        const response = await api.get('/series', {headers: {lang: 'en'}})
        let series = response.data.data
        series[2] = {"id": 2, "name": "All Timelines", "description": "", "timelines": allTimelines.timelines}
        store.dispatch(updateCurrentSeries(series))

        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

export default function Home() {
   const currentSeries = useSelector(selectCurrentSeries)

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}>
                <RequestTimelineForm />
                {currentSeries.map((series, i) => {
                    return <Swiper key={i} series={series}/>
                })}
            </div>
            <div className={'footer'}></div>
        </>
    )
}
