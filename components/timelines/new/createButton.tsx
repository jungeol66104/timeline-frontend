import React from 'react';

const CreateButton = () => {
    return (
        <button className={`px-3 flex items-center justify-center gap-1.5 h-[36px] border-[0.1px] border-gray-300 bg-black drop-shadow-sm rounded-md`}>
            <div className={'text-sm font-medium text-white'}>Create</div>
        </button>
    );
};

export default CreateButton;
