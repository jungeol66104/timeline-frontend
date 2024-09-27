import api from "@/pages/api/api";
import React from 'react';
import {useDispatch} from "react-redux";
import {updateEventContentType, updateEventHistoryType, updateModalType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvent, updateCurrentEventDraft, updateCurrentEventView, updateCurrentTimeline} from "@/store/slices/contentsSlice";

const OpenEventButton = ({type, contribution}: {type: string, contribution: any}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        if (type === 'view') {
            try {
                const timelineResponse = await api.get(`/timeline/${contribution.timelineId}/content`, {headers: {lang: 'en'}})
                const eventResponse = await api.get(`/event/${contribution.eventId}`, {headers: {lang: 'en'}})
                if (timelineResponse.data.code === 69999 || eventResponse.data.code === 69999) return
                let newTimeline = timelineResponse.data.data
                let newEvent = eventResponse.data.data

                const image = new Image();
                image.src = newEvent.cdnUrl + newEvent.imagePath;

                image.onload = () => {
                    newEvent.imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline(newTimeline))
                    dispatch(updateCurrentEvent(newEvent))
                    dispatch(updateCurrentEventDraft(newEvent))
                    dispatch(updateModalType('event'))
                    dispatch(updateEventContentType('view'))
                }
            } catch (error) {console.error('Error fetching event: ', error)}
        } else {
            try {
                const timelineResponse = await api.get(`/timeline/${contribution.timelineId}/content`, {headers: {lang: 'en'}})
                const eventResponse = await api.get(`/event/${contribution.eventId}`, {headers: {lang: 'en'}})
                const historyResponse = await api.get(`/event/${contribution.eventId}/history/${contribution.id}`, {headers: {lang: 'en'}})
                if (timelineResponse.data.code === 69999 || eventResponse.data.code === 69999 || historyResponse.data.code === 69999) return
                let newTimeline = timelineResponse.data.data
                let newEvent = eventResponse.data.data
                let newEventRevision = historyResponse.data.data

                const image = new Image();
                image.src = newEventRevision.cdnUrl + newEventRevision.imagePath;

                image.onload = () => {
                    newEventRevision.imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline(newTimeline))
                    dispatch(updateCurrentEvent(newEvent))
                    dispatch(updateCurrentEventView(newEventRevision))
                    dispatch(updateModalType('event'))
                    dispatch(updateEventContentType('history'))
                    dispatch(updateEventHistoryType('view'))
                }
            } catch (error) {console.error('Error fetching event: ', error)}
        }
    }

    return (
        <span onClick={handleClick} className={'cursor-pointer font-bold underline decoration-gray-300 hover:decoration-black'}>
            {type === 'view' && contribution.eventTitle}
            {type === 'revision' && 'Revision ' + contribution.revisionNo}
        </span>
    );
};

export default OpenEventButton;
