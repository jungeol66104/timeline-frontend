import api from "@/pages/api/api";
import React from "react";
import {useSelector} from "react-redux";
import {storeWrapper} from "@/store/store";
import {updateSession} from "@/store/slices/privateSlice";
import {selectIsBottomEnd, updateIsBottomEnd, updateTotalPage} from "@/store/slices/appearanceSlice";
import {selectCurrentPageContributions, updateCurrentPageContributions} from "@/store/slices/contentsSlice";
import DynamicHead from "@/components/dynamicHead";
import EventContribution from "@/components/common/contributions/contribution/eventContribution";
import AdsTimelineTop from "@/components/ads/adsTimelineTop";
import KeynoteContribution from "@/components/common/contributions/contribution/keynoteContribution";
import AttachmentContribution from "@/components/common/contributions/contribution/attachmentContribution";
import TimelineContribution from "@/components/common/contributions/contribution/timelineContribution";
import useOperateHistories from "@/hooks/useOperateHistories";
import IndexSectionSecondary from "@/components/index/indexSectionSecondary";

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async ({req}) => {
    try {
        const jwt = req.cookies.timeline_jwt
        if (jwt) {
            const response = await api.get(`/user/info`, {headers: {lang: 'en', Authorization: `Bearer ${jwt}`}});
            if (response.data.code === 69999) return { notFound: true }
            const data = response.data.data

            store.dispatch(updateSession(data))
        }

        const response = await api.get(`/history?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
        const data = response.data.data
        if (response.data.code === 69999) return { notFound: true }

        store.dispatch(updateCurrentPageContributions(data.histories))
        store.dispatch(updateTotalPage(data.totalPage))
        store.dispatch(updateIsBottomEnd(data.totalPage <= 1))
    } catch (error) {console.error('Error fetching initial data during SSR: ', error);}
    return {props: {}}
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
                    <div className={'relative p-3 pb-0 h-fit w-full max-w-[630px] min-[852px]:min-w-[500px] flex flex-col gap-3'}>
                        <div>
                            <h1 className={'text-2xl font-bold'}>Histories</h1>
                            <div className={`w-fit text-md`}>See the most recent updates made by Timeline users</div>
                        </div>
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
                    <IndexSectionSecondary />
                    {/*<div className={'relative ml-[20px] max-[872px]:ml-0 p-4 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>*/}
                </div>
            </div>
        </>
    )
}

export default HistoriesPage;
