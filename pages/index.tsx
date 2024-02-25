import api from "@/utils/api";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {selectCurrentSeries, updateCurrentSeries} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/series/swiper";
// refactoring: clear


export const getStaticProps = storeWrapper.getStaticProps((store) => async (context) => {
    try {
        const response = await api.get('/series', {headers: {lang: 'en'}})
        let series = response.data.data
        store.dispatch(updateCurrentSeries(series))

        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}}
    }
})

export default function Home() {
    const currentSeries = useSelector(selectCurrentSeries)

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page indexPage pt-5 pb-2.5'}>
                {currentSeries.map((series, i) => {
                    return <Swiper key={i} series={series}/>
                })}
            </div>
        </>
    )
}
