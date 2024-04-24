import api from "@/utils/api";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {selectCurrentTimelines, updateCurrentTimelines} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import {updateCurrentPage, updateCurrentTopic, updateIsBottomEnd, updateTagNum, updateTotalPage} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import {getIsBaseImage, mapStrToNum} from "@/utils/global";
import React from "react";
import IndexBottom from "@/components/index/indexBottom";
import Link from "next/link";
import useOperateIndex from "@/hooks/useOperateIndex";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({query}) => {
    try {
        const tagNum = Number(query.tagNum)
        const response = await api.get(`/timeline?requestType=${tagNum}&pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data
        store.dispatch(updateCurrentTimelines(data.timelineList))
        store.dispatch(updateTagNum(tagNum))
        store.dispatch(updateCurrentTopic(tagNum === 0 ? 'Recently Added' : 'Popular'))
        store.dispatch(updateCurrentPage(1))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage === 1))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}}
    }
})

export default function Home() {
    const currentTimelines = useSelector(selectCurrentTimelines)

    useOperateIndex()

    return (
        <>
            <DynamicHead type={'index'}/>
            <div className={'page indexPage pt-[44px]'}>
                <div className={'relative h-fit w-full max-w-[600px] px-4 pt-1 pb-0'}>
                    {currentTimelines.map(timeline => {
                        const isBaseImage = getIsBaseImage(timeline.image)

                        return (
                            <Link key={timeline.id} href={`/timelines/${timeline.id}`}>
                                <div className={'py-3'}>
                                    <div className={'font-bold line-clamp-1'}>{timeline.name}</div>
                                    <div className={'flex gap-1'}>
                                        <div>
                                            <div className={'text-sm text-gray-500 line-clamp-1'}>{timeline.description}</div>
                                            <p className={'mt-1 text-sm line-clamp-3'}>{timeline.content}</p>
                                        </div>
                                        <div className={'relative w-[84px] h-[84px] shrink-0'}>
                                            {isBaseImage
                                                ? <>
                                                    <div className={'absolute bottom-[1px] right-0 w-[80px] h-[80px] rounded-md text-white flex items-center justify-center'}>
                                                        {/*<span className={'absolute'}>{timeline.name.charAt(0).toUpperCase()}</span>*/}
                                                        <Image src={`/images/base-image/base-image${mapStrToNum(timeline.name)}.jpg`} alt={'base-image'} fill={true} priority={true} className={'rounded-md bg-gray-500'}/>
                                                    </div>
                                                </>
                                                : <Image src={timeline.image} alt={timeline.name} fill={true} priority={true} style={{objectFit: "cover", objectPosition: "top"}} className={'rounded-md'} />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <hr/>
                            </Link>
                        )
                    })}
                <IndexBottom />
                </div>
            </div>
        </>
    )
}
