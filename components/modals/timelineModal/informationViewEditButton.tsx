import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectInformationContentType, selectTimelineType, updateInformationContentType, updatePopupType} from "@/store/slices/appearanceSlice";
import {selectIsSession, selectSession, updateSession} from "@/store/slices/privateSlice";
import {getSession} from "@/utils/global";

const InformationViewEditButton = () => {
    const dispatch = useDispatch()
    const session = useSelector(selectSession)
    const isSession = Object.keys(session).length !== 0
    const contentType = useSelector(selectInformationContentType)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleClick = async (contentType: string) => {
        if (contentType === 'edit') {
            if (isSession) dispatch(updateInformationContentType(contentType))
            else {
                window.open(`/api/auth/signin`, 'google-login-popup', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);

                window.addEventListener('message', (event) => {
                    if (event.origin !== window.location.origin) return;
                    if (event.data.type === 'SIGNIN_SUCCESS') {
                        getSession().then((session) => {
                            dispatch(updateSession(session));
                            dispatch(updateInformationContentType(contentType))
                        })
                    }
                });
            }
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
