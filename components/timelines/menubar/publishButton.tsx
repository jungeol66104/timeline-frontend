import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectDemoKeyConcept, selectIsPopup, selectTimelineType, updateIsPopup} from "@/store/slices/appearanceSlice";
import PublishTimelinePopup from "@/components/layout/popups/publishTimelinePopup";

const PublishButton = () => {
    const dispatch = useDispatch()
    const isPopup = useSelector(selectIsPopup)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    return (
        <>
            <button onClick={() => dispatch(updateIsPopup(true))} className={`px-3 max-[852px]:px-2 h-[36px] text-sm font-semibold bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 ${timelineType === 'demo' && demoKeyConcept === 'private' && 'outline outline-2 outline-blue-700'} drop-shadow-sm rounded-md`}>Publish</button>
            {isPopup &&
                <PublishTimelinePopup />
            }
        </>
    );
};

export default PublishButton;
