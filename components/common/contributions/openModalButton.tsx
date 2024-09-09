import api from "@/pages/api/api";
import React from 'react';
import {useDispatch} from "react-redux";
import {updateEventContentType, updateEventHistoryType, updateInformationContentType, updateInformationHistoryType, updateModalType} from "@/store/slices/appearanceSlice";
import {updateCurrentEventView, updateCurrentTimelineView} from "@/store/slices/contentsSlice";

const OpenModalButton = ({contribution}: {contribution: any}) => {
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (contribution.editHistoryType % 2 === 0 ) {
            try {
                const response = await api.get(`/event/${contribution.eventId}/history/${contribution.id}`, {headers: {lang: 'en'}})
                if (response.data.code === 69999) return
                let newEvent = response.data.data
                dispatch(updateCurrentEventView(newEvent))
                dispatch(updateModalType('event'))
                dispatch(updateEventContentType('history'))
                dispatch(updateEventHistoryType('view'))
            } catch (error) {console.error('Error fetching event: ', error)}
        } else {
            try {
                const response = await api.get(`/timeline/${contribution.timelineId}/history/${contribution.id}`, {headers: {lang: 'en'}})
                if (response.data.code === 69999) return
                let newTimeline = response.data.data
                dispatch(updateCurrentTimelineView(newTimeline))
                dispatch(updateModalType('information'))
                dispatch(updateInformationContentType('history'))
                dispatch(updateInformationHistoryType('view'))
            } catch (error) {console.error('Error fetching information: ', error)}
        }
    }

    return (
        <button onClick={handleClick} className={`material-symbols-outlined text-[20px] px-2 flex items-center justify-center h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>&#xe89d;</button>
    );
};

export default OpenModalButton;
