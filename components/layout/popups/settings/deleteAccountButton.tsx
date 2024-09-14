import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const DeleteAccountButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updatePopupType('deleteAccount'))} className={'text-sm text-blue-700 hover:underline'}>Delete Account</button>
    );
};

export default DeleteAccountButton;
