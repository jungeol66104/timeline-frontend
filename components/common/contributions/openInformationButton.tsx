import api from "@/pages/api/api";
import React from 'react';
import {useDispatch} from "react-redux";
import {updateCurrentTimeline, updateCurrentTimelineDraft, updateCurrentTimelineView} from "@/store/slices/contentsSlice";
import {updateInformationContentType, updateInformationHistoryType, updateModalType} from "@/store/slices/appearanceSlice";

const OpenInformationButton = ({type, contribution}: {type: string, contribution: any}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
        if (type === 'view') {
            try {
                const response = await api.get(`/timeline/${contribution.timelineId}/content`, {headers: {lang: 'en'}})
                if (response.data.code === 69999) return
                let newTimeline = response.data.data

                const image = new Image();
                image.src = newTimeline.cdnUrl + newTimeline.imagePath;

                image.onload = () => {
                    newTimeline.imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline(newTimeline))
                    dispatch(updateCurrentTimelineDraft(newTimeline))
                    dispatch(updateModalType('information'))
                    dispatch(updateInformationContentType('view'))
                }
            } catch (error) {console.error('Error fetching information: ', error)}
        } else {
            try {
                const timelineResponse = await api.get(`/timeline/${contribution.timelineId}/content`, {headers: {lang: 'en'}})
                const historyResponse = await api.get(`/timeline/${contribution.timelineId}/history/${contribution.id}`, {headers: {lang: 'en'}})
                if (historyResponse.data.code === 69999) return
                let newTimeline = timelineResponse.data.data
                let newTimelineRevision = historyResponse.data.data

                const image = new Image();
                image.src = newTimelineRevision.cdnUrl + newTimelineRevision.imagePath;

                image.onload = () => {
                    newTimelineRevision.imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline(newTimeline))
                    dispatch(updateCurrentTimelineView(newTimelineRevision))
                    dispatch(updateModalType('information'))
                    dispatch(updateInformationContentType('history'))
                    dispatch(updateInformationHistoryType('view'))
                }
            } catch (error) {console.error('Error fetching information: ', error)}
        }
    }

    return (
        <span onClick={handleClick} className={'cursor-pointer font-bold underline decoration-gray-300 hover:decoration-black'}>
            {type === 'view' && contribution.timelineTitle}
            {type === 'revision' && 'Revision ' + contribution.revisionNo}
        </span>
    );};

export default OpenInformationButton;
