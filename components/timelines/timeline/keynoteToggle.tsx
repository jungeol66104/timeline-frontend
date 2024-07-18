import React from 'react';
import {selectCurrentEventsDraft, TimelineEvent, updateDraftKeynote} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";

const KeynoteToggle = ({event} : {event: TimelineEvent}) => {
    const dispatch = useDispatch()

    const handleToggle = (id: number) => {
        dispatch(updateDraftKeynote(id))
    }

    return (
        <div className={'flex items-center justify-center gap-2'}>
            <span className={'text-sm font-semibold'}>Keynote</span>
            <input type={'checkbox'} checked={event.keynote === 1} onChange={() => handleToggle(event.id)} className={'w-[14px]'}/>
        </div>
    );
};

export default KeynoteToggle;
