import React from 'react';
import {useDispatch} from "react-redux";
import {TimelineEvent, updateDraftKeynote} from "@/store/slices/contentsSlice";

const KeynoteCheckbox = ({event} : {event: TimelineEvent}) => {
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

export default KeynoteCheckbox;
