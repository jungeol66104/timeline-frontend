import React from 'react';
import {useDispatch} from "react-redux";
import api from "@/pages/api/api";
import {updateCurrentTimeline, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {updateInformationContentType, updateModalType} from "@/store/slices/appearanceSlice";

const InformationTitleButton = ({contribution}: {contribution: any}) => {
    const dispatch = useDispatch()

    const handleClick = async () => {
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
    }

    return (
        <span onClick={handleClick} className={'font-bold hover:underline cursor-pointer'}>{contribution.timelineTitle}</span>
    );};

export default InformationTitleButton;
