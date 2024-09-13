import React from 'react';
import Popup from "@/components/layout/popups/popup";

const TitleErrorPopup = () => {
    return (
        <Popup title={'Error'}>
            <div className={'flex flex-col justify-between gap-5 font-medium'}>
                <p>Title format is not valid. You need to include at least one character to the title.</p>
            </div>
        </Popup>
    );
};

export default TitleErrorPopup;
