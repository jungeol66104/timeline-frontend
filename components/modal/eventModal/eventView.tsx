import React from 'react';
import ContributorsButton from "@/components/common/contributorsButton";
import EditButton from "@/components/personal/editButton";
import {useSelector} from "react-redux";
import {selectCurrentEvent} from "@/store/slices/contentsSlice";
import ContentTypeButton from "@/components/common/contentTypeButton";

const EventView = () => {
    const currentEvent = useSelector(selectCurrentEvent)

    return (
        <div className={'flex flex-col gap-3'}>
            <hr/>
            <p>{currentEvent.description}</p>
        </div>
    )
}
export default EventView
