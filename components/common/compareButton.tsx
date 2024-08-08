import {useDispatch} from "react-redux";
import {updateModalHistoryType} from "@/store/slices/appearanceSlice";

const CompareButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(updateModalHistoryType('diff'))} className={`px-3 max-[852px]:px-2 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
            {/*<div className={'material-symbols-outlined text-[20px]'}>&#xe915;</div>*/}
            <div className={'text-sm font-semibold'}>Compare</div>
        </button>
    );
};

export default CompareButton;
