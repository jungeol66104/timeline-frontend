import api from "@/pages/api/api";
import axios from "axios";
import {getIsBaseImage} from "@/utils/global";
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline, selectCurrentTimelineDraft, updateCurrentTimeline, updateCurrentTimelineDraft} from "@/store/slices/contentsSlice";
import {selectDemoKeyConcept, selectTimelineType, updateModalType} from "@/store/slices/appearanceSlice";
import InformationPreviewImage from "@/components/timelines/informationPreviewImage";

const InformationPreview = () => {
    const dispatch = useDispatch();
    const timelineType = useSelector(selectTimelineType);
    const demoKeyConcept = useSelector(selectDemoKeyConcept);
    const currentTimeline = useSelector(selectCurrentTimeline)
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft)
    const [imageHover, setImageHover] = useState(false);

    const timeline = timelineType === 'new' ? currentTimelineDraft : currentTimeline;

    const handleClick = async () => {
        try {
            let newTimeline: any;
            if (timelineType === 'new' || timelineType === 'demo') {
                newTimeline = {...timeline}
            } else if (timelineType === 'public') {
                const response = await api.get(`/timeline/${currentTimeline.id}/content`, {headers: {lang: 'en'}})
                if (response.data.code === 69999) return
                newTimeline = response.data.data
            } else if (timelineType === 'private') {
                const response = await axios.get(`/api/user/information/fetch?timelineId=${currentTimeline.id}`)
                newTimeline = response.data.data
            }

            const image = new Image();
            image.src = timelineType === 'demo' && !getIsBaseImage(newTimeline.imagePath) ? newTimeline.imagePath : newTimeline.cdnUrl + newTimeline.imagePath;

            image.onload = () => {
                newTimeline.imageSize = {width: image.width, height: image.height}
                dispatch(updateCurrentTimeline(newTimeline))
                dispatch(updateCurrentTimelineDraft(newTimeline))
                dispatch(updateModalType('information'))
            };
        } catch (error) {console.error('Error fetching data in useEffect: ', error)}
    }

    const handleImageClick = (e: React.MouseEvent) => e.stopPropagation()

    const handleImageTouch = (e: React.TouchEvent) => {
        e.stopPropagation()
        setImageHover(true)
    }

    return (
        <div onClick={handleClick} onTouchStart={() => setImageHover(false)} className={`${!imageHover && 'cursor-pointer hover:bg-gray-100'} p-3 border-[0.1px] border-gray-300 rounded-2xl ${timelineType === 'demo' && demoKeyConcept === 'information' && 'outline outline-2 outline-blue-700'}`}>
            <div>
                <div className={'flex items-center gap-2'}>
                    <h2 className={'timelineTitle text-2xl font-bold break-words'}>{timeline.title === '' ? 'New Timeline' : timeline.title}</h2>
                    {(timelineType === 'private' || (timelineType === 'demo' && demoKeyConcept === 'private')) && <span className={`px-1.5 py-1 text-[10px] text-gray-400 font-semibold border-[1px] border-gray-400 rounded-full ${timelineType === 'demo' && demoKeyConcept === 'private' && 'outline outline-2 outline-blue-700'}`}>PRIVATE</span>}
                </div>
                <div className={`min-[630px]:hidden line-clamp-1 break-words`}>{timeline.description === '' ? 'New timeline description' : timeline.description}</div>
            </div>
            <div>
                <div onClick={handleImageClick} onMouseEnter={() => setImageHover(true)} onMouseLeave={() => setImageHover(false)} onTouchStart={(e) => handleImageTouch(e)}><InformationPreviewImage information={timeline} /></div>
                <div className={'flex flex-col gap-1 max-[630px]:mt-1'}>
                    <div className={`max-[630px]:hidden line-clamp-1 break-words`}>{timeline.description === '' ? 'New timeline description' : timeline.description}</div>
                    <div className={'text-sm text-gray-600 line-clamp-4'}>{timeline.content === '' ? 'Click this timeline box to edit the title, description, content and image of the timeline!' : timeline.content}</div>
                </div>
            </div>
        </div>
    );
};

export default InformationPreview;
