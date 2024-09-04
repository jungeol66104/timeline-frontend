import React from 'react';
import Popup from "@/components/layout/popups/popup";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentTimeline} from "@/store/slices/contentsSlice";
import {useRouter} from "next/router";

const PublishPopup = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const currentTimeline = useSelector(selectCurrentTimeline)

    const handleClick = async () => {
        const body = { "timelineId" : currentTimeline.id }
        try {
            const response = {status: 200}
            // const response = await axios.post('/api/user/timeline/publish-timeline', body);
            if (response.status === 200) {
                router.push('/')
            }
        } catch (error) {
            console.error('Error creating timeline: ', error)
            return
        }
    }

    return (
        <Popup title={'Publish Timeline'}>
            <div>
                <div className={'flex flex-col gap-5 font-medium'}>
                    <p>If you publish your timeline, anyone can edit the timeline. Any kind of access from the internet is allowed.</p>
                    <p>In detail,</p>
                    <p className={'px-5 flex flex-col gap-2.5 text-sm font-normal'}>
                        <span>1. Your private timeline will remain independent.</span>
                        <span>2. Anyone can see the timeline.</span>
                        <span>3. Anyone can fix the description, content and image of the timeline. <span
                            className={'text-red-700'}>The title of the timeline is unchangeable after publishing.</span></span>
                        <span>4. Anyone can fix the title, description, content and image of the events in the timeline.</span>
                        <span>5. The timeline can be merged or deduplicated if there is a timeline that deals with similar topic.</span>
                    </p>
                </div>
                <button onClick={handleClick} className={`w-full h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Publish</button>
            </div>
        </Popup>
)
    ;
};

export default PublishPopup;
