import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectTimelineType, updateInformationContentType} from "@/store/slices/appearanceSlice";
import {selectCurrentTimelineDraft, updateCurrentTimeline} from "@/store/slices/contentsSlice";

const SaveInformationButton = () => {
    const dispatch = useDispatch()
    const timelineType = useSelector(selectTimelineType)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft);

    const handleSave = () => {
        if (timelineType === 'private' || timelineType === 'public') {
            const body = {
                "isPrivate": timelineType === 'private' ? 1 : 0,
                "timelineId": currentTimelineDraft.id,
                "revisionNo": 1, // add to the store
                "title": currentTimelineDraft.title,
                "description": currentTimelineDraft.description,
                "content": currentTimelineDraft.content,
                "imagePath": currentTimelineDraft.imagePath,
                "note": ""
            }

            try {
                // const response = await axios.put('/api/wiki/timeline/update-timeline', body);
            } catch (error) {
                console.error('Error creating event: ', error)
                return
            }
        }

        dispatch(updateCurrentTimeline(currentTimelineDraft))
        if (timelineType !== 'new') dispatch(updateInformationContentType('view'))
        return
    }

    return (
        <button onClick={handleSave} className={`px-3 h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Save</div>
        </button>
    )
};

export default SaveInformationButton;
