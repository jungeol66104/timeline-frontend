import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/swiper";
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
        store.dispatch(updateCurrentSeries(series))

        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

export default function Home() {
    const currentSeries = useSelector(selectCurrentSeries)
    console.log(currentSeries)
    const newSeries = {
        description: "",
        hasMore: "false"
    }

//     description: "Navigating the Tides of Finance"
//     hasMore: false
//     id: 1
//     name: "Financial Crisis"
//     timelines: [
//          {id: 6, name: 'Global Financial Crisis', description: 'Worldwide economic collapse of 2008', image: 'https://timeline-image.s3.ap-northeast-2.amazonaws…922b77e2ef7cb2e125025d083bc5ab81aa6395daf926ba54d'},
//          {id: 8, name: 'Asian Financial Crisis', description: '1997 economic turmoil in Asian countries', image: 'https://timeline-image.s3.ap-northeast-2.amazonaws…922b77e2ef7cb2e125025d083bc5ab81aa6395daf926ba54d'},
//          {id: 9, name: 'Great Depression', description: 'Widespread poverty, unemployment, and economic hardship in 1930s', image: 'https://timeline-image.s3.ap-northeast-2.amazonaws…922b77e2ef7cb2e125025d083bc5ab81aa6395daf926ba54d'}
//     ]
//     length: 3

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}>
                <div>
                    {/*<Swiper series={} />*/}
                    {/*<RequestTimelineForm />*/}
                </div>
                {currentSeries.map((series, i) => {
                    return <Swiper key={i} series={series}/>
                })}
            </div>
            <div className={'footer'}></div>
        </>
    )
}
