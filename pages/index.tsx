import api from "@/utils/api";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {selectCurrentSerieses, updateCurrentSerieses} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/series/swiper";

export const getStaticProps = storeWrapper.getStaticProps((store) => async (context) => {
    try {
        const response = await api.get('/series', {headers: {lang: 'en'}})
        let series = response.data.data
        store.dispatch(updateCurrentSerieses(series))

        return {props: {}, revalidate: 10}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}, revalidate: 10}
    }
})

export default function Home() {
    const currentSerieses = useSelector(selectCurrentSerieses)


    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page indexPage py-4 gap-4'}>
                {currentSerieses.map((series, i) => {
                    return <Swiper key={i} series={series}/>
                })}
            </div>
        </>
    )
}
