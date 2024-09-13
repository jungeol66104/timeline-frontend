import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentEvents, selectCurrentTimeline, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {selectTimelineType, updateModalType, updatePopupType} from "@/store/slices/appearanceSlice";
import Popup from "@/components/layout/popups/popup";
import axios from "axios";

const DetachEventPopup = () => {
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

            try {
                const response = await axios.put('/api/wiki/attachment', body);
                if (response.status === 200) {
                    if (response.data.code === 69999) return
                    const newCurrentEvents = currentEvents.filter((event) => event.id !== currentEventDraft.id)
                    dispatch(updateCurrentEvents(newCurrentEvents))
                    dispatch(updateModalType('none'))
                    dispatch(updatePopupType('none'))
                }
            } catch (error) {console.error('Error creating timeline: ', error)}
        } else {
            const newCurrentEvents = currentEvents.filter((event) => event.id !== currentEventDraft.id)
            dispatch(updateCurrentEvents(newCurrentEvents))
            dispatch(updateModalType('none'))
            dispatch(updatePopupType('none'))
        }
    }


    return (
        <Popup title={'Detach Event'}>
            <div>
                <div className={'flex flex-col gap-3 font-medium'}>
                    {timelineType === 'public' && <p>Are you sure? You can restore this event in <span className={'text-sm font-regular'}>Timeline History Tab</span> after detaching it from the timeline.</p>}
                    {timelineType !== 'public' && <p>Are you sure? If you detach this event from the timeline, you cannot restore it back.</p>}
                    <button onClick={handleClick} className={`w-full h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Detach Event</button>
                </div>
            </div>
        </Popup>
    );
};

export default DetachEventPopup;
