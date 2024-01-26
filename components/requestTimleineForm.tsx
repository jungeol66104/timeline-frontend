import React, {useState} from 'react';

const RequestTimelineForm = () => {
    const [showSendButton, setShowSendButton] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setShowSendButton(true)
    }

    const handleEditClick = () => {
        setShowSendButton(false)
    }
    return (
        <div className={'flex flex-col gap-2.5 mt-[20px] mb-[30px] mx-[20px] pt-3.5 pb-5 px-5 border-[0.1px] border-gray-300 rounded-xl shadow-md'}>
            <div>
                <span className={'text-sm text-gray-500'}>Give Feedback</span>
                <h2 className={'text-2xl font-bold'}>Request Timeline</h2>
            </div>
            <p>Send us the timeline you want, and we&apos;ll notify you by email once it&apos;s created.</p>
            <form onSubmit={handleSubmit} className={'flex flex-col gap-5 mt-2.5'}>
                <div className={'relative h-[50px] rounded-lg border-[1px] border-black'}>
                    <label className={'absolute top-[-10px] left-4 bg-white px-1 text-sm'}>Timeline</label>
                    <div className={'flex h-full w-full pr-4'}>
                        <input type={'timeline'} className={'px-4 h-full flex-grow shrink-0 bg-transparent focus:outline-none'} readOnly={showSendButton} />
                        {showSendButton && <button onClick={handleEditClick} className={'shrink-0 text-gray-500 hover:text-black'}>Edit</button>}
                    </div>
                </div>
                { showSendButton &&
                    <div className={'relative h-[50px] rounded-lg border-[1px] border-black'}>
                        <label className={'absolute top-[-10px] left-4 bg-white px-1 text-sm '}>Email(Optional)</label>
                        <input type={'email'} className={'px-4 h-full w-full bg-transparent focus:outline-none'} />
                    </div>
                }
                <button type={"submit"} className={'h-[50px] rounded-lg bg-black text-white font-semibold'}>{showSendButton ? 'Send' : 'Continue'}</button>
            </form>
        </div>
    );
};

export default RequestTimelineForm;
