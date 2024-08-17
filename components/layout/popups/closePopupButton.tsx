import {updateIsPopup, updateEventContentType, updateEventHistoryType, updateModalType} from "@/store/slices/appearanceSlice";
import {useDispatch} from "react-redux";

const ClosePopupButton = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(updateIsPopup(false))
    }

    return (
        <button onClick={handleClick} className={'absolute right-4 top-3 shrink-0 material-symbols-outlined text-[20px]'}>&#xe5cd;</button>
    );
};

export default ClosePopupButton;
