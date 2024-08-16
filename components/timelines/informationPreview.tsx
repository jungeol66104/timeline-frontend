import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
import InformationPreviewImage from "@/components/timelines/informationPreviewImage";

const InformationPreview = () => {
    const dispatch = useDispatch();
    const currentTimeline = useSelector(selectCurrentTimeline)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const handleClick = async () => {
        try {
            dispatch(updateModalType('information'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    return (
        <div onClick={handleClick} className={'cursor-pointer p-3 hover:bg-gray-100 border-[1px] border-gray-300 rounded-2xl'}>
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
