import React from 'react';

const TimelineListRelated = () => {
    return (
        <div className={'flex gap-3 items-center'}>
            <h3 className={'text-[20px] font-bold py-3'}>Related</h3>
            <div className={'flex gap-2'}>
                <div
                    className={'py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>Saudi Arabia</div>
                <div className={'py-1 px-2 border-[1px] border-gray-300 rounded-md cursor-pointer text-blue-700 text-sm hover:bg-gray-100'}>King Saud University</div>
            </div>
        </div>
    );
};

export default TimelineListRelated;
