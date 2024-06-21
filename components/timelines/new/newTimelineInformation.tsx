import React from 'react';

const NewTimelineInformation = () => {
    const newTimeline = {
        name: 'Topic',
        description: 'Brief description about the topic in less than 10 words',
        content: 'You can write basic information about the topic after clicking ‘Show More’ button below. ',
        createdDt: 'June 21, 2024',
    }

    return (
        <div className={`timelineInformation`}>
            <div className={'py-3 px-4 flex'}>
                <div className={'h-[120px]'}>
                    <p className={`text-sm line-clamp-5`}>{newTimeline.content}</p>
                    <button className={'text-sm text-blue-700 hover:underline'}>Show more</button>
                </div>
                <div className={'h-[120px] w-[120px] bg-gray-600 rounded-md ml-2.5 shrink-0'}></div>
            </div>
        </div>
    );
};

export default NewTimelineInformation;
