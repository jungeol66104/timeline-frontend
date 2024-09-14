import api from "@/pages/api/api";
import React from "react";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {selectIsBottomEnd, updateIsBottomEnd, updateTotalPage} from "@/store/slices/appearanceSlice";
import {selectCurrentPageContributions, updateCurrentPageContributions} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import EventContribution from "@/components/common/contributions/contribution/eventContribution";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import KeynoteContribution from "@/components/common/contributions/contribution/keynoteContribution";
import AttachmentContribution from "@/components/common/contributions/contribution/attachmentContribution";
import TimelineContribution from "@/components/common/contributions/contribution/timelineContribution";
import useOperateHistories from "@/hooks/useOperateHistories";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
    try {
        const response = await api.get(`/history?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data
        if (response.data.code === 69999) return { notFound: true }

        store.dispatch(updateCurrentPageContributions(data.histories))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage <= 1))
        return {props: {}}
    } catch (error) {
        console.error('Error fetching initial data during SSR: ', error);
        return {props: {}}
    }
})

const HistoriesPage = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd)
    const currentPageContributions = useSelector(selectCurrentPageContributions);

    useOperateHistories()

    return (
        <>
            <DynamicHead type={'histories'}/>
            <div className={'page h-full'}>
                <AdsTimelineTop />
                <hr/>
                <div className={'pageWrapper relative w-full flex'}>
                    {/* Section Primary */}
                    <div className={'relative h-fit w-full max-w-[630px] px-4 pt-10 flex flex-col gap-10 text-lg font-medium'}>
                        <h1 className={'text-6xl max-[450px]:text-5xl font-bold'}>Histories</h1>
                            <div>
                                <hr/>
                                <div className={'w-full'}>
                                    {currentPageContributions.map(contribution => {
                                        switch (contribution.editHistoryType) {
                                            case 1:
                                            case 2:
                                                return <KeynoteContribution type={'histories'} contribution={contribution} />
                                            case 3:
                                            case 4:
                                                return <AttachmentContribution type={'histories'} contribution={contribution} />
                                            case 5:
                                            case 7:
                                                return <TimelineContribution type={'histories'} contribution={contribution} />
                                            case 6:
                                            case 8:
                                                return <EventContribution type={'histories'} contribution={contribution} />
                                        }
                                    })}
                                </div>
                                <div className={`${!isBottomEnd && 'invisible'} w-full mt-2.5 h-[70px] shrink-0 flex justify-center items-center`}>
                                    <div className={`text-sm font-normal text-center italic pb-[10px]`}>End of the Page<br/><b>{'Histories'.charAt(0).toUpperCase() + 'Histories'.slice(1)}</b></div>
                                </div>
                        </div>
                    </div>
                    {/* Section Secondary */}
                    <div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>
                </div>
            </div>
        </>
    )
}

export default HistoriesPage;
