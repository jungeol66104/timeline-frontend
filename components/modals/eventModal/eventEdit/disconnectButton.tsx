import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEventDraft, selectCurrentEventsDraft, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";

const DisconnectButton = () => {
    const dispatch = useDispatch()
    const currentEventDraft = useSelector(selectCurrentEventDraft)
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)

    const handleClick = (id: number) => {
        const newEventsDraft = currentEventsDraft.filter(event => event.id !== id)
        dispatch(updateCurrentEventsDraft(newEventsDraft))
    }

    return (
        <button onClick={() => handleClick(currentEventDraft.id)} className={'material-symbols-outlined text-[22px] w-[36px] h-[36px] hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md'}>&#xe15b;</button>
    );
};

export default DisconnectButton;
