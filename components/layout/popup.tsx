import React from 'react';
import ReactDOM from 'react-dom';
import ClosePopupButton from "@/components/layout/closePopupButton";
import {useDispatch} from "react-redux";
import {updateIsPopup} from "@/store/slices/appearanceSlice";

const Popup = ({title, children}: {title: string, children: React.ReactNode}) => {
    const dispatch = useDispatch();

    const portal = typeof window !== 'undefined' ? document.getElementById('portal') : null
    if (!portal) return

    return ReactDOM.createPortal(
        <div className={'fixed top-0 left-0 w-full h-full'}>
            <div onClick={() => dispatch(updateIsPopup(false))} className={`fixed opacity-30 w-full h-full top-0 left-0 bg-black`}></div>
            <div className={'absolute overflow-y-hidden min-[416px]:w-[400px] max-[416px]:w-[calc(100%-16px)] h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl flex flex-col items-center'} style={{zIndex: 5003}}>
                <div className={'relative py-2.5 w-full border-b-[1px] text-center'}>
                    <h2 className={'text-md font-semibold'}>{title}</h2>
                    <ClosePopupButton/>
                </div>
                <div className={'p-4 w-full h-full overflow-y-scroll'}>{children}</div>
            </div>
        </div>,
        portal
    );
};

export default Popup;
