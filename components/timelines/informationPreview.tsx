import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, selectCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
import InformationPreviewImage from "@/components/timelines/informationPreviewImage";

const InformationPreview = () => {
    const dispatch = useDispatch();
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);

    const timeline = timelineType === 'new' ? currentTimelineDraft : currentTimeline;

    const [imageHover, setImageHover] = useState(false);

    const handleClick = async () => {
        try {
            dispatch(updateModalType('information'))
            return
        } catch (error) {
            console.error('Error fetching data in useEffect: ', error)
            return
        }
    }

    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <div onClick={handleClick} className={`${!imageHover && 'cursor-pointer hover:bg-gray-100'} p-3 border-[1px] border-gray-300 rounded-2xl`}>
            <div>
                <div className={'flex items-center gap-2'}>
                    <span className={'text-2xl font-bold'}>{timeline.name === '' ? 'New Timeline' : timeline.name}</span>
                    {timelineType === 'private' && <span className={`px-1.5 py-1 text-[10px] text-gray-400 font-semibold border-[1px] border-gray-400 rounded-full`}>PRIVATE</span>}
                </div>
                <div className={`min-[630px]:hidden line-clamp-1`}>{timeline.description === '' ? 'New timeline description' : timeline.description}</div>
            </div>
            <div>
                <div onClick={handleImageClick} onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)}><InformationPreviewImage information={currentTimeline} /></div>
                <div className={'flex flex-col gap-1 max-[630px]:mt-1'}>
                    <div className={`max-[630px]:hidden line-clamp-1`}>{timeline.description === '' ? 'New timeline description' : timeline.description}</div>
                    <div className={'text-sm text-gray-600 line-clamp-4'}>{timeline.content === '' ? 'Click this timeline box to edit the title, description, content and image of the timeline!' : timeline.content}</div>
                </div>
            </div>
        </div>
    );
};

export default InformationPreview;
