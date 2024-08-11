import React from 'react';
import Popup from "@/components/layout/popups/popup";
import {useDispatch} from "react-redux";
import {updateIsPopup} from "@/store/slices/appearanceSlice";

const PublishTimelinePopup = () => {
    const dispatch = useDispatch()

    return (
        <Popup title={'Publish Timeline'}>
            <div className={'flex flex-col gap-5 font-medium'}>
                <p>After publishing this timeline,</p>
                <p className={'px-5 flex flex-col gap-2.5 text-sm font-normal'}>
                    <span>1. Anyone can see the timeline.</span>
                    <span>2. Anyone can fix the description, content and image of the timeline. <span className={'text-red-700'}>The title of the timeline is unchangeable after publishing.</span></span>
                    <span>3. Anyone can fix the title, description, content and image of the events in the timeline.</span>
                    <span>4. The timeline can be merged or deduplicated if there is a timeline that deals with similar topic.</span>
                </p>
                <div className={'flex flex-col gap-2'}>
                    <label className={'flex gap-2'}>
                        <input type={'checkbox'} />
                        <span className={'text-sm'}>Also Create this timeline private.</span>
                    </label>
                    <button onClick={() => dispatch(updateIsPopup(false))} className={`w-full h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Publish</button>
                </div>
            </div>
        </Popup>
    );
};

export default PublishTimelinePopup;
