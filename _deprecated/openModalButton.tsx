import api from "@/pages/api/api";
import React from 'react';
import {useDispatch} from "react-redux";
import {updateEventContentType, updateEventHistoryType, updateInformationContentType, updateInformationHistoryType, updateModalType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvent, updateCurrentEventView, updateCurrentTimeline, updateCurrentTimelineView} from "@/store/slices/contentsSlice";

const OpenModalButton = ({contribution}: {contribution: any}) => {
    const dispatch = useDispatch();

    const handleClick = async () => {
        if (contribution.editHistoryType % 2 !== 0 ) {
            try {
                const timelineResponse = await api.get(`/timeline/${contribution.timelineId}/content`, {headers: {lang: 'en'}})
                const historyResponse = await api.get(`/timeline/${contribution.timelineId}/history/${contribution.id}`, {headers: {lang: 'en'}})
                if (historyResponse.data.code === 69999) return
                let newTimeline = timelineResponse.data.data
                let newTimelineView = historyResponse.data.data

                const image = new Image();
                image.src = newTimelineView.cdnUrl + newTimelineView.imagePath;

                image.onload = () => {
                    newTimelineView.imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline(newTimeline))
                    dispatch(updateCurrentTimelineView(newTimelineView))
                    dispatch(updateModalType('information'))
                    dispatch(updateInformationContentType('history'))
                    dispatch(updateInformationHistoryType('view'))
                }
            } catch (error) {console.error('Error fetching information: ', error)}
        } else {
            try {
                const eventResponse = await api.get(`/event/${contribution.eventId}`, {headers: {lang: 'en'}})
                const historyResponse = await api.get(`/event/${contribution.eventId}/history/${contribution.id}`, {headers: {lang: 'en'}})
                if (eventResponse.data.code === 69999 || historyResponse.data.code === 69999) return
                let newEvent = eventResponse.data.data
                let newEventView = historyResponse.data.data

                const image = new Image();
                image.src = newEventView.cdnUrl + newEventView.imagePath;

                image.onload = () => {
                    newEventView.imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentEvent(newEvent))
                    dispatch(updateCurrentEventView(newEventView))
                    dispatch(updateModalType('event'))
                    dispatch(updateEventContentType('history'))
                    dispatch(updateEventHistoryType('view'))
                }

            } catch (error) {console.error('Error fetching event: ', error)}
        }
    }

    return (
        <button onClick={handleClick} className={`material-symbols-outlined text-[20px] px-2 flex items-center justify-center h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>&#xe89d;</button>
    );
};

export default OpenModalButton;
