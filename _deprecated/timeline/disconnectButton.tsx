import {selectCurrentEventsDraft, TimelineEvent, updateCurrentEventsDraft} from "@/store/slices/contentsSlice";
import {useDispatch, useSelector} from "react-redux";

const DisconnectButton = ({event}:{event: TimelineEvent}) => {
    const dispatch = useDispatch()
    const currentEventsDraft = useSelector(selectCurrentEventsDraft)

    const handleClick = (id: number) => {
        const newEventsDraft = currentEventsDraft.filter(event => event.id !== id)
        dispatch(updateCurrentEventsDraft(newEventsDraft))
    }

    return (
        <button onClick={() => handleClick(event.id)} className={'material-symbols-outlined text-[20px] rounded-full hover:bg-gray-100'}>&#xe15b;</button>
    );
};

export default DisconnectButton;
