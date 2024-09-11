import axios from "axios";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";

const DetachButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = async () => {

        if (timelineType === 'private' || timelineType === 'public') {
            const body = {
                // EXTREMELY IMPORTANT
                "isPrivate": timelineType === 'public' ? 0 : 1,
                "eventId": currentEventDraft.id,
                "timelineId": currentTimeline.id,
                "attachValue": 0,
                "note": ""
            }
            console.log(body)

            try {
                const response = await axios.post('/api/wiki/attachment', body);
                if (response.status === 200) {
                    if (response.data.code === 69999) return
                    const newCurrentEvents = currentEvents.filter((event) => event.id !== currentEventDraft.id)
                    dispatch(updateCurrentEvents(newCurrentEvents))
                    dispatch(updateModalType('none'))
                }
            } catch (error) {console.error('Error creating timeline: ', error)}
        } else {
            const newCurrentEvents = currentEvents.filter((event) => event.id !== currentEventDraft.id)
            dispatch(updateCurrentEvents(newCurrentEvents))
            dispatch(updateModalType('none'))
        }
    }

    return (
        <button onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe15b;</button>
    );
};

export default DetachButton;
