import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType, updateInformationContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectSession} from "@/store/slices/privateSlice";
import {selectCurrentTimeline, updateCurrentTimeline, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";

const InformationViewEditButton = () => {
    const dispatch = useDispatch()
    const session = useSelector(selectSession)
    const contentType = useSelector(selectInformationContentType)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);
    const currentTimeline = useSelector(selectCurrentTimeline)

    const isSession = Object.keys(session).length !== 0

    const handleClick = async (contentType: string) => {
        if (contentType === 'edit') {
            if (isSession || timelineType === 'new' || timelineType === 'demo') {
                const image = new Image();
                image.src = currentTimeline.cdnUrl! + currentTimeline.imagePath!;
                image.onload = () => {
                    const imageSize = {width: image.width, height: image.height}
                    dispatch(updateCurrentTimeline({...currentTimeline, imageSize}))
                    dispatch(updateCurrentTimelineDraft({...currentTimeline, imageSize}))
                    dispatch(updateInformationContentType(contentType))
                }
            } else dispatch(updatePopupType('signIn'))
        } else {
            const image = new Image();
            image.src = currentTimeline.cdnUrl! + currentTimeline.imagePath!;
            image.onload = () => {
                const imageSize = {width: image.width, height: image.height}
                dispatch(updateCurrentTimeline({...currentTimeline, imageSize}))
                dispatch(updateCurrentTimelineDraft({...currentTimeline, imageSize}))
                dispatch(updateInformationContentType(contentType))
            }
        }
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'} bg-white drop-shadow-sm rounded-md`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${contentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${contentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
        </div>
    );
};

export default InformationViewEditButton;
