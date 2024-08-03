import React from 'react';
import CloseModalButton from "@/components/modal/closeModalButton";

const CenterModal = ({children, title}: {children: React.ReactNode, title: string}) => {
    return (
        <div className={'fixed w-full max-w-lg h-full left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex: 5003}}>
            <div className={'relative py-2.5 w-full border-b-[1px] text-center'}>
                <h2 className={'text-md font-semibold'}>{title}</h2>
                <CloseModalButton/>
            </div>
            {children}
            {/*<div className={'p-4 w-full h-full flex flex-col gap-3 overflow-y-scroll'}></div>*/}
        </div>
    );
};

export default CenterModal;
