import React from 'react';
import {useSelector} from "react-redux";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";

const PublishButton = () => {
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const showPublishButton = timelineType !== 'private' && !(timelineType === 'demo' && demoKeyConcept === 'private')

    return (
        <button className={`flex items-center gap-2.5 px-3 max-[852px]:px-2 h-[36px] text-sm font-semibold border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 ${showPublishButton && 'hidden'} ${timelineType === 'demo' && demoKeyConcept === 'private' && 'outline outline-2 outline-blue-700'} drop-shadow-sm rounded-md`}>
            Publish
        </button>
    );
};

export default PublishButton;
