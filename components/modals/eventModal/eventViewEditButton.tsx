import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectEventContentType, selectTimelineType, updateEventContentType, updateEventHistoryType, updateInformationContentType} from "@/store/slices/appearanceSlice";
import {getSession} from "@/utils/global";
import {selectIsSession, updateSession} from "@/store/slices/privateSlice";

const EventViewEditButton = () => {
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)
    const timelineType = useSelector(selectTimelineType)
    const eventContentType = useSelector(selectEventContentType)
    const demoKeyConcept = useSelector(selectDemoKeyConcept)

    const handleClick = (contentType: string) => {
        if (contentType === 'edit') {
            if (isSession) dispatch(updateEventContentType(contentType))
            else {
                window.open(`/api/auth/signin`, 'google-login-popup', `width=488, height=${window.screen.height}, top=0, left=${window.screen.width/2 - 244}, scrollbars=yes`);

                window.addEventListener('message', (event) => {
                    if (event.origin !== window.location.origin) return;
                    if (event.data.type === 'SIGNIN_SUCCESS') {
                        const session = getSession();
                        dispatch(updateSession(session));
                        dispatch(updateEventContentType(contentType))
                    }
                });
            }
        } else dispatch(updateEventContentType(contentType))
    }

    return (
        <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md ${timelineType === 'demo' && demoKeyConcept === 'edit' && 'outline outline-2 outline-blue-700'}`}>
            <button onClick={() => handleClick('view')} className={`px-2.5 w-[55px] h-8 text-sm rounded-md ${eventContentType === 'view' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>View</button>
            <button onClick={() => handleClick('edit')} className={`px-2.5 w-[46px] h-8 text-sm rounded-md ${eventContentType === 'edit' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Edit</button>
        </div>
    );
};

export default EventViewEditButton;
