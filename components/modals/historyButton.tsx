import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    selectEventContentType,
    selectModalType,
    selectInformationContentType,
    updateEventContentType,
    updateEventHistoryType,
    updateInformationContentType,
    updateInformationHistoryType,
    updateTotalPage, updateIsBottomEnd
} from "@/store/slices/appearanceSlice";
import api from "@/pages/api/api";
import {selectCurrentEvent, selectCurrentTimeline, updateCurrentModalContributions} from "@/store/slices/contentsSlice";

const HistoryButton = () => {
    const dispatch = useDispatch()
    const modalType = useSelector(selectModalType)
    const timelineContentType = useSelector(selectInformationContentType)
    const modalContentType = useSelector(selectEventContentType)
    const contentType = modalType === 'event' ? modalContentType : timelineContentType
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvent = useSelector(selectCurrentEvent)

    const handleClick = async () => {
        if (modalType === 'information') {
            const response = await api.get(`/timeline/${currentTimeline.id}/history?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return
            const data = response.data.data

            dispatch(updateCurrentModalContributions(data.histories))
            dispatch(updateInformationContentType('history'))
            dispatch(updateInformationHistoryType('list'))
            dispatch(updateTotalPage(data.totalPage))
            dispatch(updateIsBottomEnd(data.totalPage <= 1))
        } else {
            const response = await api.get(`/event/${currentEvent.id}/history?pageNum=1&pageSize=20`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return
            const data = response.data.data

            dispatch(updateCurrentModalContributions(data.histories))
            dispatch(updateEventContentType('history'))
            dispatch(updateEventHistoryType('list'))
            dispatch(updateTotalPage(data.totalPage))
            dispatch(updateIsBottomEnd(data.totalPage <= 1))
        }
    }

    return (
        <div className={'w-[36px] h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>
            <button onClick={handleClick} className={`material-symbols-outlined text-[20px] w-8 h-8 rounded-md ${contentType === 'history' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white drop-shadow-sm' : 'hover:bg-gray-100'}`}>&#xe889;</button>
        </div>
    );
};

export default HistoryButton;
