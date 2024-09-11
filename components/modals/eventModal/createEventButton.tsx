import axios from "axios";
import React from 'react';
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {selectErrorType, selectTimelineType, updateEventContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, updateCurrentEvent, updateCurrentEvents} from "@/store/slices/contentsSlice";

const CreateEventButton = () => {
    const router = useRouter()

    const dispatch = useDispatch();
    const timelineType = useSelector(selectTimelineType)
    const errorType = useSelector(selectErrorType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft);

    const handleClick = async () => {
        if (errorType === 'date') {
            dispatch(updatePopupType('dateError'))
            return
        }

        if (timelineType === 'private' || timelineType === 'public') {
            const body = {
                // EXTREMELY IMPORTANT
                "isPrivate": timelineType === 'public' ? 0 : 1,
                "timelineId": currentTimeline.id,
                "date": currentEventDraft.date,
                "ephemerisTime": currentEventDraft.ephemerisTime,
                "title": currentEventDraft.title,
                "content": currentEventDraft.content,
                "imagePath": currentEventDraft.imagePath,
                "isKeynote": currentEventDraft.isKeynote,
                "note": "",
            }

            try {
                const response = await axios.post('/api/wiki/event/create', body);
                if (response.status === 200) {
                    console.log(response.data)
                    if (response.data.code === 69999) return
                    router.push(`/timelines/${currentTimeline.id}`)
                }
            } catch (error) {console.error('Error creating event: ', error)}
        } else {
            const events = [...currentEvents, currentEventDraft]
            events.sort((a, b) => Number(a.ephemerisTime) - Number(b.ephemerisTime))
            dispatch(updateCurrentEvent(currentEventDraft));
            dispatch(updateCurrentEvents(events))
            if (timelineType !== 'new') dispatch(updateEventContentType('view'))
        }

    }

    return (
        <button onClick={handleClick} className={`px-3 h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Create</div>
        </button>
    );
};

export default CreateEventButton;
