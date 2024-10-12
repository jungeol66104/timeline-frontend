import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsSession} from "@/store/slices/privateSlice";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const BannerModal = () => {
    const dispatch = useDispatch()
    const isSession = useSelector(selectIsSession)

    const [hide, setHide] = useState(true);

    useLayoutEffect(() => {
        const bannerModal = sessionStorage.getItem('bannerModalHide');
        if (bannerModal) setHide(true);
        else setHide(false);
    }, []);

    const handleClick = () => {
        setHide(true);
        sessionStorage.setItem('bannerModalHide', 'true');
    };

    const bottom = !hide && !isSession ? 0 : '-260px'
    return (
        <div className={'page fixed left-0 bottom-0 max-[260px]:hidden z-[5005]'}>
            <div className={'pageWrapper relative w-full flex'}>
                {/* Section Primary */}
                <div className={'relative w-full max-w-[630px] min-[852px]:min-w-[500px]'}>
                    <div className={'absolute w-full flex flex-col items-center bg-white rounded-t-3xl border-[0.1px] border-gray-300'} style={{bottom: bottom, transition: 'bottom 0.3s'}}>
                        <div className={'content py-6 px-4 w-full h-full flex flex-col gap-3 items-center'}>
                            <div className={'max-[500px]:hidden text-2xl font-bold text-center'}>Become an Editor of Timeline Wiki</div>
                            <div className={'min-[500px]:hidden text-2xl font-bold text-center'}><div>Become an Editor of</div><div>Timeline Wiki</div></div>
                            <div className={'flex flex-col gap-1.5'}>
                                <div className={'font-medium text-center'}>USD $0 for creating and editing infinite number of timelines after sign up.</div>
                                <button onClick={() => dispatch(updatePopupType('signIn'))} className={'text-sm text-blue-700 hover:underline'}>Learn More</button>
                            </div>
                            <div className={'flex gap-3 shrink-0 justify-end'}>
                                <button onClick={handleClick} className={'text-gray-500 text-sm font-medium hover:text-black'}>Not Now</button>
                                <button onClick={() => dispatch(updatePopupType('signIn'))} className={'p-4 flex items-center justify-center h-[36px] rounded-full bg-black hover:bg-[#333333] text-white text-sm font-medium border-[0.1px] border-gray-300'}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Secondary */}
                <div className={'relative ml-[20px] max-[872px]:ml-0 max-[852px]:py-0 w-full min-w-[332px] max-w-[352px] max-[852px]:hidden'}></div>
            </div>
        </div>
    );
};

export default BannerModal;
