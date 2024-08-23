import React from 'react';

const SaveSettingsButton = () => {
    return (
        <button className={`w-full flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-black text-white drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium'}>Save</div>
        </button>
    );
};

export default SaveSettingsButton;
