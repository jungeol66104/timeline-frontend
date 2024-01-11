import DynamicHead from "@/components/dynamicHead";
import Image from "next/image";
import Swiper from "@/components/swiper";
// refactoring: clear

export default function Home() {
    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}>
                <Swiper />
            </div>
        </>
    )
}
