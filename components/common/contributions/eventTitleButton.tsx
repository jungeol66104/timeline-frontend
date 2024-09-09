import api from "@/pages/api/api";
import React from 'react';
import {useDispatch} from "react-redux";
import {updateModalType} from "@/store/slices/appearanceSlice";
import {updateCurrentEvent, updateCurrentEventDraft} from "@/store/slices/contentsSlice";

const EventTitleButton = ({contribution}: {contribution: any}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        try {
            const response = await api.get(`/event/${Number(contribution.eventId)}`, {headers: {lang: 'en'}})
            if (response.data.code === 69999) return
            let newEvent = response.data.data
            dispatch(updateCurrentEvent(newEvent))
            dispatch(updateCurrentEventDraft(newEvent))
            dispatch(updateModalType('event'))
        } catch (error) {console.error('Error fetching event: ', error)}
    }

    return (
        <span onClick={handleClick} className={'font-bold hover:underline cursor-pointer'}>{contribution.eventTitle}</span>
    );
};

export default EventTitleButton;
