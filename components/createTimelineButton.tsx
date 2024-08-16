import React, {useState} from 'react';
import Popup from "@/components/layout/popups/popup";
import {useDispatch, useSelector} from "react-redux";
import {selectIsPopup, updateIsPopup} from "@/store/slices/appearanceSlice";
import PublishTimelinePopup from "@/components/layout/popups/publishTimelinePopup";

const CreateTimelineButton = () => {
    const [popUpOrder, setPopUpOrder] = useState(0)

    const dispatch = useDispatch()
    const isPopup = useSelector(selectIsPopup)

    const handleClick = () => {
        dispatch(updateIsPopup(true))
        setPopUpOrder(0)
    }

    return (
        <>
            <button onClick={handleClick} className={`px-3 max-[852px]:px-2 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
            {isPopup && popUpOrder === 0 &&
                <Popup title={'Create Timeline'}>
                    <div className={'flex flex-col gap-5 font-medium'}>
                        <p>Click <span className={'text-sm font-normal'}>Publish Button</span> to create public timeline with additional settings.</p>
                        <p>Click <span className={'text-sm font-normal'}>Create Button</span> to create private timeline that only you can view and edit.</p>
                        <div className={'w-full flex gap-3'}>
                            <button onClick={() => setPopUpOrder(1)} className={`flex-1 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Publish</button>
                            <button onClick={handleClick} className={`flex-1 h-[36px] text-center text-sm font-medium text-white border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>Create</button>
                        </div>
                    </div>
                </Popup>
            }
            {isPopup && popUpOrder === 1 &&
                <PublishTimelinePopup />
            }
        </>
    );
};

export default CreateTimelineButton;


