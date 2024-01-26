import React, {useState} from 'react';
import {useForm} from "react-hook-form";

const RequestTimelineForm = () => {
    const [showSendButton, setShowSendButton] = useState(false)
    const {register, handleSubmit } = useForm()

    const handleCustomSubmit = async () => {
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
            <form onSubmit={handleSubmit(handleCustomSubmit)} className={'flex flex-col gap-5 mt-2.5'} noValidate>
                <div className={`relative h-[50px] rounded-lg border-[1px] ${showSendButton ? 'border-gray-300' : 'border-black'}`}>
                    {!showSendButton && <label className={'absolute top-[-10px] left-4 bg-white px-1 text-sm'}>Timeline</label>}
                    <div className={'flex h-full w-full'}>
                        <input type={'timeline'} {...register('timeline', {required: "Timeline is required."})} className={'px-4 h-full flex-grow shrink-0 bg-transparent focus:outline-none'} readOnly={showSendButton} />
                        {showSendButton && <button onClick={handleEditClick} className={'shrink-0 mr-4'}>Edit</button>}
                    </div>
                    <p></p>
                </div>
                { showSendButton &&
                    <div className={'relative h-[50px] rounded-lg border-[1px] border-black'}>
                        <label className={'absolute top-[-10px] left-4 bg-white px-1 text-sm '}>Email(Optional)</label>
                        <input type={'email'} {...register('email', {pattern: { value: /^[^@]+@[^.]+\..+$/, message: "Email format is invalid."}})} className={'px-4 h-full w-full bg-transparent focus:outline-none'} />
                        <p></p>
                    </div>
                }
                <button type={"submit"} className={'h-[50px] rounded-lg bg-black text-white font-semibold'}>{showSendButton ? 'Send' : 'Continue'}</button>
            </form>
        </div>
    );
};

export default RequestTimelineForm;
