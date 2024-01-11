import DynamicHead from "@/components/dynamicHead";
import Image from "next/image";
// refactoring: clear

export default function Home() {
    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page'}>
                <div className={'my-[20px]'}>
                    <div className={'pl-5'}>
                        <div className={'text-sm text-gray-500'}>되풀이되는 금융의 역사를 보고싶다면</div>
                        <div className={'text-2xl font-bold'}>금융 위기</div>
                    </div>
                        <div className={'flex px-5 gap-2.5 w-full mt-2.5 overflow-x-scroll'}>
                            <div className={'relative shrink-0'} style={{ width:`calc((100% - 20px)/2.1)`, paddingTop: `calc((100% - 20px)/2.1)`}} >
                                <Image src={'/images/timeline/1.png'} alt={'Joe Biden'} fill className={'rounded-xl'}/>
                                <div className={'absolute top-0 left-0 w-full h-full opacity-10 bg-black'}></div>
                            </div>
                            <div className={'relative shrink-0'} style={{ width:`calc((100% - 20px)/2.1)`, paddingTop: `calc((100% - 20px)/2.1)`}} >
                                <Image src={'/images/timeline/1.png'} alt={'Joe Biden'} fill/>
                            </div>
                            <div className={'relative shrink-0'} style={{ width:`calc((100% - 20px)/2.1)`, paddingTop: `calc((100% - 20px)/2.1)`}} >
                                <Image src={'/images/timeline/1.png'} alt={'Joe Biden'} fill/>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}
