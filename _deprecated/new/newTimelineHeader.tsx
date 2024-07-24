
const NewTimelineHeader = () => {
    const newTimeline = {
        name: 'Topic',
        description: 'Brief description about the topic in less than 10 words',
        content: 'You can write basic information about the topic after clicking ‘Show More’ button below. ',
        createdDt: 'June 21, 2024',
    }

    return (
        <div className={'pt-4 px-4'}>
            <div>
                <h1 className={'timelineInformationName text-2xl font-bold'}>{newTimeline.name}</h1>
                <div className={'text-md'}>{newTimeline.description}</div>
                <div className={'my-1 flex gap-1 text-gray-400 text-sm'}>Created: June 21, 2024</div>
            </div>
            <div className={'relative pt-3 w-full flex justify-between bg-white'} style={{zIndex: 50}}>
                <button className={`flex items-center gap-2.5 px-3 max-[852px]:px-2 h-[36px] border-[0.1px] border-gray-300 bg-white hover:bg-gray-100 drop-shadow-sm rounded-md`}>
                    <div className={'text-sm font-semibold max-[852px]:hidden'}>Contributor</div>
                    <div className={'flex gap-1.5 justify-center items-center'}>
                        <div className={'w-[26px] h-[26px] rounded-full flex items-center justify-center bg-gray-600 text-white text-xs border-[1px] border-white shrink-0'}>PI</div>
                        <span className={'text-sm font-semibold'}>Nickname</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NewTimelineHeader;
