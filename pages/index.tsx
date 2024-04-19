import api from "@/utils/api";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {selectCurrentSerieses, selectCurrentTimelines, updateCurrentSerieses, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import Swiper from "@/components/series/swiper";
import {updateCurrentPage, updateIsBottomEnd} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import React from "react";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({query}) => {
    try {
        // const response = await api.get('/series', {headers: {lang: 'en'}})
        // let series = response.data.data
        // store.dispatch(updateCurrentSerieses(series))

        const tagNum = Number(query.tagNum) || 0
        const response = await api.get(`/timeline?requestType=${tagNum}&pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data
        store.dispatch(updateCurrentTimelines(data.timelineList))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateIsBottomEnd(data.totalPage === 1))

        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}}
    }
})

export default function Home() {
    const currentTimelines = useSelector(selectCurrentTimelines)
    const content = 'Mohammed bin Salman, also known as MBS, is the Crown Prince and Prime Minister of Saudi Arabia. He has implemented social and economic reforms, including improving women\'s rights and diversifying the economy. However, his government has been criticized for human rights abuses and repression of political dissidents.'
    // const currentSerieses = useSelector(selectCurrentSerieses)

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page indexPage'}>
                <div className={'relative h-fit w-full max-w-[600px] px-4 pt-1 pb-0'}>
                    {currentTimelines.map(timeline => {
                        const isBaseImage = getIsBaseImage(timeline.image)

                        return (
                            <>
                                <div key={timeline.id} className={'py-3'}>
                                    <div className={'text-lg font-semibold line-clamp-1'}>{timeline.name}</div>
                                    <div className={'flex gap-2'}>
                                        <div>
                                            <div className={'text-md text-gray-500 line-clamp-1'}>{timeline.description}</div>
                                            <p className={'text-sm line-clamp-3'}>{content}</p>
                                        </div>
                                        <div className={'relative w-[84px] h-[84px] shrink-0'}>
                                            {isBaseImage
                                                ? <>
                                                    <div
                                                        className={'relative w-full h-full rounded-md bg-gray-500 text-white flex items-center justify-center text-lg font-medium'}>
                                                        {/*<span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>*/}
                                                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} width={92} height={92} priority={true}
                                                               className={'rounded-md'}/>
                                                    </div>
                                                </>
                                                : <Image className={'rounded-md'} src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}}/>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </>
                        )
                    })}
                </div>
            </div>


            {/*<div className={'page indexPage py-4 gap-4'}>*/}
            {/*    {currentSerieses.map((series, i) => {*/}
            {/*        return <Swiper key={i} series={series}/>*/}
            {/*    })}*/}
            {/*</div>*/}
        </>
    )
}
