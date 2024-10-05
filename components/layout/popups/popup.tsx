import React from 'react';
import ReactDOM from 'react-dom';
import ClosePopupButton from "@/components/layout/popups/closePopupButton";
import {useDispatch} from "react-redux";
import {updatePopupType} from "@/store/slices/appearanceSlice";

const Popup = ({title, children}: {title: string, children: React.ReactNode}) => {
    const dispatch = useDispatch();

    const portal = typeof window !== 'undefined' ? document.getElementById('portal') : null
    if (!portal) return

    return ReactDOM.createPortal(
        <div className={'fixed top-0 left-0 w-full h-full'} style={{zIndex: 5003}}>
            <div onClick={() => dispatch(updatePopupType('none'))} className={`absolute top-0 w-full h-full bg-black opacity-30`}></div>
            {/*transition-all duration-300 ease-in-out*/}
            <div className={'absolute overflow-y-hidden min-[432px]:w-[400px] max-[432px]:w-[calc(100%-32px)] max-h-[400px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl flex flex-col items-center'}>
                <div className={'relative py-2.5 w-full border-b-[1px] text-center'}>
                    <h2 className={'h-[24px] text-md font-semibold'}>{title}</h2>
                    <ClosePopupButton/>
                </div>
                <div className={'p-4 w-full h-full overflow-y-auto'}>{children}</div>
            </div>
        </div>,
        portal
    );
};

export default Popup;
