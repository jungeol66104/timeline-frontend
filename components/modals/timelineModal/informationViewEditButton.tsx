import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType, updateInformationContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectIsSession} from "@/store/slices/privateSlice";

const InformationViewEditButton = () => {
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)
    const contentType = useSelector(selectInformationContentType)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleClick = (contentType: string) => {
        if (contentType === 'edit') {
            if (isSession) dispatch(updateInformationContentType(contentType))
            else dispatch(updatePopupType('signIn'))
        } else dispatch(updateInformationContentType(contentType))
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'} bg-white drop-shadow-sm rounded-md`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${contentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${contentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
        </div>
    );
};

export default InformationViewEditButton;
