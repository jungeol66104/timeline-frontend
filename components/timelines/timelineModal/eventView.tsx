import React from 'react';
import ContributionButton from "@/components/timelines/timelineModal/contributionButton";
import EditButton from "@/components/timelines/timelineModal/editButton";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";

const EventView = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div>
            <div className={'tiptapMenubar sticky top-3 w-full flex justify-between py-3'}>
                <ContributionButton/>
                <EditButton/>
            </div>
            <hr/>
            <p className={'mt-3'}>{currentEvent.description}</p>
        </div>
    )
}
export default EventView
