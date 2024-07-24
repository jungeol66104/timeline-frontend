import React from 'react';

const CreateTimelineButton = () => {

    const handleClick = () => {

    }

    return (
        <button onClick={handleClick} className={`px-3 h-[36px] flex items-center justify-center border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Create</div>
        </button>
    );
};

export default CreateTimelineButton;
