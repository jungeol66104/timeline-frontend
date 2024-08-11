import React, {useState} from 'react';
import PopUp from "@/components/layout/popUp";
import {useDispatch, useSelector} from "react-redux";
import {selectIsPopup, updateIsPopup} from "@/store/slices/appearanceSlice";

const CreateTimelineButton = () => {
    const [popUpOrder, setPopUpOrder] = useState(0)

    const dispatch = useDispatch()
    const isPopup = useSelector(selectIsPopup)

    const handleClick = () => {
    }

    return (
        <>
            <button onClick={() => dispatch(updateIsPopup(true))} className={`px-3 max-[852px]:px-2 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
            {isPopup && popUpOrder === 0 &&
                <PopUp title={'Create Timeline'}>
                    <div className={'flex flex-col gap-5 font-medium'}>
                        <p>Click <span className={'text-sm font-normal'}>Publish Button</span> to create public timeline with additional settings.</p>
                        <p>Click <span className={'text-sm font-normal'}>Create Button</span> to create private timeline that only you can view and edit.</p>
                        <div className={'w-full flex gap-3'}>
                            <button onClick={() => setPopUpOrder(1)} className={`flex-1 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Publish</button>
                            <button onClick={handleClick} className={`flex-1 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
                        </div>
                    </div>
                </PopUp>
            }
            {isPopup && popUpOrder === 1 &&
                <PopUp title={'Publish Timeline'}>
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
                            <button onClick={() => setPopUpOrder(0)} className={`w-full h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Publish</button>
                        </div>
                    </div>
                </PopUp>
            }
        </>
    );
};

export default CreateTimelineButton;


