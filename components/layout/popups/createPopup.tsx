import React, {useState} from 'react';
import Popup from "@/components/layout/popups/popup";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentEvents, selectCurrentTimelineDraft, updateCurrentEvent} from "@/store/slices/contentsSlice";
import axios from "axios";
import { useRouter } from 'next/router';

const CreatePopup = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const currentTimelineDraft = useSelector(selectCurrentTimelineDraft);
    const currentEvents = useSelector(selectCurrentEvents)
    const [createType, setCreateType] = useState('private')

    const handleClick = async () => {
        const body = {
            // EXTREMELY IMPORTANT
            "privateStatus": createType === 'private' ? 0 : createType === 'public' ? 1 : 2,
            "title": currentTimelineDraft.title,
            "description": currentTimelineDraft.description,
            "content": currentTimelineDraft.content,
            "imagePath": currentTimelineDraft.imagePath,
            "events": currentEvents
        }
        try {
            const response = {status: 200}
            // const response = await axios.post('/api/wiki/timeline/create-timeline', body);
            if (response.status === 200) {
                // dispatch(updateCurrentEvent({}))
                router.push('/')
            }
        } catch (error) {console.error('Error creating timeline: ', error)}
    }

    return (
        <Popup title={'Create Timeline'}>
            {/*h-[323.53px]*/}
            <div className={'flex flex-col justify-between gap-5 font-medium'}>
                <div className={`flex items-center p-0.5 gap-0.5 h-[36px] border-[0.1px] border-gray-300 bg-white drop-shadow-sm rounded-md`}>
                    <button onClick={() => setCreateType('private')} className={`flex-1 px-2.5 h-8 text-sm rounded-md ${createType === 'private' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Private</button>
                    <button onClick={() => setCreateType('public')} className={`flex-1 px-2.5 h-8 text-sm rounded-md ${createType === 'public' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Public</button>
                    <button onClick={() => setCreateType('both')} className={`flex-1 px-2.5 h-8 text-sm rounded-md ${createType === 'both' ? 'border-[0.1px] border-gray-300 bg-gray-600 text-white font-medium drop-shadow-sm' : 'hover:bg-gray-100 font-semibold'}`}>Both</button>
                </div>
                <div>
                    {createType === 'private' && <p>Only you can edit the timeline. Access it from your profile page.</p>}
                    {createType === 'public' &&
                        <div className={'flex flex-col gap-5 font-medium'}>
                            <p>Anyone can edit the timeline. Any kind of access from the internet is allowed.</p>
                            <p>In detail,</p>
                            <p className={'px-5 flex flex-col gap-2.5 text-sm font-normal'}>
                                <span>1. Anyone can see the timeline.</span>
                                <span>2. Anyone can fix the description, content and image of the timeline. <span className={'text-red-700'}>The title of the timeline is unchangeable after publishing.</span></span>
                                <span>3. Anyone can fix the title, description, content and image of the events in the timeline.</span>
                                <span>4. The timeline can be merged or deduplicated if there is a timeline that deals with similar topic.</span>
                            </p>
                        </div>
                    }
                    {createType === 'both' &&
                        <div className={'flex flex-col gap-5 font-medium'}>
                            <p>Create two identical and independent timelines, with one private and the other public.</p>
                            <p>After publishing the timeline,</p>
                            <p className={'px-5 flex flex-col gap-2.5 text-sm font-normal'}>
                                <span>1. Anyone can see the timeline.</span>
                                <span>2. Anyone can fix the description, content and image of the timeline. <span className={'text-red-700'}>The title of the timeline is unchangeable after publishing.</span></span>
                                <span>3. Anyone can fix the title, description, content and image of the events in the timeline.</span>
                                <span>4. The timeline can be merged or deduplicated if there is a timeline that deals with similar topic.</span>
                            </p>
                        </div>
                    }
                </div>
                <button onClick={handleClick} className={`h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
            </div>
        </Popup>
    );
};

export default CreatePopup;
