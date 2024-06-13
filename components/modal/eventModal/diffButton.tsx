import {useDispatch} from "react-redux";
import {updateHistoryType} from "@/store/slices/appearanceSlice";

const DiffButton = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => {dispatch(updateHistoryType('diff'))}} className={`pl-1.5 pr-2.5 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xeb7d;</div>
            <div className={'text-sm font-semibold'}>Diff</div>
        </button>
    );
};

export default DiffButton;
