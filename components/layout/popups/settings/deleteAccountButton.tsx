import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const DeleteAccountButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('deleteAccount'))} className={`w-full flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-red-700 text-white drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium'}>Delete Account</div>
        </button>
    );
};

export default DeleteAccountButton;
