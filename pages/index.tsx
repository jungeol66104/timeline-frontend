import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/swiper";
import {temporarySeries} from "@/utils/global"
import {storeWrapper} from "@/store/store";
import RequestTimelineForm from "@/components/requestTimleineForm";
// refactoring: clear

// for dev
// export const getServerSideProps = storeWrapper.getServerSideProps((store) => async (context) => {
//     try {
//         return {props: {}}
//     } catch (error) {
//         console.error('Error fetching initial data during SSR:', error);
//         return {props: {}}
//     }
// })

export const getStaticProps = storeWrapper.getStaticProps((store) => async (context) => {
    try {
        return {props: {}, revalidate:10}
    } catch (error) {
        console.error('Error fetching initial data during SSR:', error);
        return {props: {}}
    }
})

export default function Home() {

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}>
                <RequestTimelineForm />
                {temporarySeries.map((series, i) => {
                    return <Swiper key={i} series={series}/>
                })}
            </div>
            <div className={'footer'}></div>
        </>
    )
}
