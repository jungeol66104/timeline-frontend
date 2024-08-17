import {updateEventContentType, updateEventHistoryType, updateModalType} from "@/store/slices/appearanceSlice";
import {useDispatch} from "react-redux";

const CloseModalButton = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(updateModalType('none'))
        dispatch(updateEventContentType('view'))
        dispatch(updateEventHistoryType('list'))
    }

    return (
        <button onClick={handleClick} className={'absolute right-4 top-3 shrink-0 material-symbols-outlined text-[20px]'}>&#xe5cd;</button>
    );
};

export default CloseModalButton;
