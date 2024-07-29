import React from 'react';

const OpenTimelineButton = () => {
    return (
        <button className={`px-2 flex items-center justify-center h-[36px] bg-white hover:bg-gray-100 border-[0.1px] border-gray-300 drop-shadow-sm rounded-md`}>
            <div className={'material-symbols-outlined text-[20px]'}>&#xe89e;</div>
        </button>

    );
};

export default OpenTimelineButton;