import React from 'react';
import {useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineType} from "@/store/slices/appearanceSlice";
import InformationPreviewImage from "@/components/timelines/informationPreviewImage";

const InformationPreview = () => {
    const currentTimeline = useSelector(selectCurrentTimeline)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    return (
        <div className={'cursor-pointer p-4 hover:bg-gray-100 border-[1px] border-gray-300 rounded-lg'}>
            <div className={'flex items-center gap-2'}>
                <span className={'text-2xl font-bold'}>{currentTimeline.name}</span>
                {timelineType === 'private' && <span className={`px-1.5 py-1 text-[10px] text-gray-400 font-semibold border-[1px] border-gray-400 rounded-full`}>PRIVATE</span>}
            </div>
            <div>
                <InformationPreviewImage information={currentTimeline} />
                <div className={'flex flex-col gap-1'}>
                    <div className={`line-clamp-1`}>{currentTimeline.description}</div>
                    <div className={'text-sm text-gray-600 line-clamp-4'}>Lorem ipsum dolor sit amet consectetur. Sagittis mi tortor sed maecenas accumsan etiam malesuada vitae. Et condimentum vitae amet dui vulputate scelerisque aliquet. Lorem ipsum dolor sit amet consectetur. Sagittis mi tortor sed maecenas accumsan etiam malesuada vitae</div>
                </div>
            </div>
        </div>
    );
};

export default InformationPreview;
