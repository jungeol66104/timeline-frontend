import React from 'react';
import Popup from "@/components/layout/popups/popup";

const SameTitlePopup = () => {
    return (
        <Popup title={'Error'}>
            <div className={'flex flex-col justify-between gap-5 font-medium'}>
                <p>Timeline with the same title has already been published.</p>
                <p>Please consider changing the title or using parentheses to clarify the difference. For example, if the title <span className={'text-sm font-normal'}>Amazon</span> is already taken, use <span className={'text-sm font-normal'}>Amazon (company)</span>.</p>
            </div>
        </Popup>
    );
};

export default SameTitlePopup;
