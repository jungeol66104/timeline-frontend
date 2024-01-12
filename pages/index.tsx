import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/swiper";
import {temporarySeries} from "@/utils/global"
import {storeWrapper} from "@/store/store";
import {useDispatch, useSelector} from "react-redux";
import {selectIsSearch, updateIsSearch} from "@/store/slices/searchSlice";
import {useEffect} from "react";
// refactoring: clear

export const getStaticProps = storeWrapper.getServerSideProps((store) => async (context) => {
    try {
        return {props: {}}
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
                {temporarySeries.map((series, i) => {
                    return <Swiper key={i} series={series}/>
                })}
            </div>
            <div className={'footer'}>

            </div>
        </>
    )
}
