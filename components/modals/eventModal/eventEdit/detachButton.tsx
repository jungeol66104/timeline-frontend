import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentEvents, updateCurrentEvents} from "@/store/slices/contentsSlice";
import {updateModalType} from "@/store/slices/appearanceSlice";

const DetachButton = () => {
    const dispatch = useDispatch()
    const currentEvents = useSelector(selectCurrentEvents)
    const currentEventDraft = useSelector(selectCurrentEventDraft)

    const handleClick = () => {
        const newCurrentEvents = currentEvents.filter((event) => event.id !== currentEventDraft.id)
        dispatch(updateCurrentEvents(newCurrentEvents))
        dispatch(updateModalType('none'))
    }

    return (
        <button onClick={handleClick} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe15b;</button>
    );
};

export default DetachButton;
