import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/swiper";
import {temporarySeries} from "@/utils/global"
// refactoring: clear

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
