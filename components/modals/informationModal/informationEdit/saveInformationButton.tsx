import axios from "axios";
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateInformationContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimelineDraft, updateCurrentTimeline} from "@/store/slices/contentsSlice";

const SaveInformationButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft);

    const handleSave = async () => {
        if (timelineType === 'private' || timelineType === 'public') {
            const body = {
                "isPrivate": timelineType === 'public' ? 0 : 1,
                "timelineId": currentTimelineDraft.id,
                "revisionNo": currentTimelineDraft.revisionNo,
                "title": currentTimelineDraft.title,
                "description": currentTimelineDraft.description,
                "content": currentTimelineDraft.content,
                "imagePath": currentTimelineDraft.imagePath,
                "note": ""
            }
            console.log(body)
            try {
                const response = await axios.put('/api/wiki/timeline/update', body);
                console.log(response)
                if (response.status === 200) {
                    if (response.data.code === 69999) return
                    dispatch(updateCurrentTimeline(currentTimelineDraft))
                    dispatch(updateInformationContentType('view'))
                }
            } catch (error) {console.error('Error creating event: ', error)}
        } else {
            dispatch(updateCurrentTimeline(currentTimelineDraft))
            if (timelineType !== 'new') dispatch(updateInformationContentType('view'))
        }
    }

    return (
        <button onClick={handleSave} className={`px-3 h-[36px] flex items-center justify-center bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveInformationButton;
