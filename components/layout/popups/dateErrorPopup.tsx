import React from 'react';
import Popup from "@/components/layout/popups/popup";

const DateErrorPopup = () => {
    return (
        <Popup title={'Error'}>
            <div className={'flex flex-col justify-between gap-5 font-medium'}>
                <p>Date format is not valid. Only <span className={'text-sm font-normal'}>YYYY-MM-DD HH:MM:SS BCE</span> format is accepted.</p>
            </div>
        </Popup>
);
};

export default DateErrorPopup;
