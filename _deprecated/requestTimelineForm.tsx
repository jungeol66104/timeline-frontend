// import React, {useState} from 'react';
// import {useForm} from "react-hook-form";
// import Image from "next/image";
// import api from "@/pages/api/api";
//
// const RequestTimelineForm = () => {
//     const [showSendButton, setShowSendButton] = useState(false)
//     const {register, handleSubmit , reset, formState: {errors} } = useForm<FormData>({reValidateMode: 'onSubmit', criteriaMode: 'firstError'})
//
//     const handleCustomSubmit = async (data: FormData) => {
//         if (showSendButton) {
//             await api.post(`/timeline/user`, {"timeline": data.timeline, "email": data.email || null}, {headers: {lang: 'en'}})
//             setShowSendButton(false)
//             reset()
//         } else setShowSendButton(true)
//     }
//
//     return (
//         <div className={'max-w-[1000px] flex flex-col gap-2.5 mt-[20px] mb-[20px] mx-[20px] pt-3.5 pb-5 px-5 border-[0.1px] border-gray-300 rounded-xl shadow-md'} style={{width: 'calc(100% - 40px)'}}>
//             <div>
//                 <span className={'text-sm text-gray-500'}>Give Feedback</span>
//                 <h2 className={'text-2xl font-bold'}>Request Timeline</h2>
//             </div>
//             <>
//                 <p>Send us the timeline you want, and we&apos;ll notify you by email once it&apos;s created.</p>
//                 <form onSubmit={handleSubmit(handleCustomSubmit)} className={'flex flex-col mt-2.5'} noValidate>
//                     <div className={`relative h-[50px] rounded-lg border-[1px] ${showSendButton ? 'border-gray-300' :  errors.timeline ? 'border-red-600' : 'border-black'}`}>
//                         {!showSendButton && <label className={`absolute top-[-10px] left-4 bg-white pl-1 pr-1.5 text-sm ${ errors.timeline ? 'text-red-700' : 'text-black'}`}>Timeline</label>}
//                         <div className={'flex h-full w-full'}>
//                             <input type={'timeline'} {...register('timeline', {required: {value: true, message: "Timeline is required."}})} className={'px-4 h-full flex-grow shrink-0 bg-transparent focus:outline-none'} readOnly={showSendButton} />
//                             {showSendButton && <button onClick={() => setShowSendButton(false)} className={'shrink-0 mr-4'}>Edit</button>}
//                         </div>
//                     </div>
//                     <p className={'mx-1 mt-1 text-xs text-red-700 flex gap-1 items-center'}>{errors.timeline?.message && <><Image src={'svg/error.svg'} alt={'error'} width={13} height={13}/><span>{errors.timeline?.message}</span></>}</p>
//                     {!showSendButton && <button type={"submit"} className={'mt-5 h-[50px] rounded-lg bg-black text-white font-semibold'}>Continue</button>}
//                     { showSendButton &&
//                         <>
//                             <div className={`relative h-[50px] mt-5 rounded-lg border-[1px] ${ errors.email ? 'border-red-600' : 'border-black'}`}>
//                                 <label className={`absolute top-[-10px] left-4 bg-white px-1 text-sm ${ errors.email ? 'text-red-700' : 'text-black'}`}>Email(Optional)</label>
//                                 <input type={'email'} {...register('email', {pattern: { value: /^[^@]+@[^.]+\..+$/, message: "Email format is invalid."}})} className={'px-4 h-full w-full bg-transparent focus:outline-none'} />
//                             </div>
//                             <p className={'mx-1 mt-1 text-xs text-red-700 flex gap-1 items-center'}>{errors.email?.message && <><Image src={'svg/error.svg'} alt={'error'} width={13} height={13}/><span>{errors.email?.message}</span></>}</p>
//                             <button type={"submit"} className={'mt-5 h-[50px] rounded-lg bg-black text-white font-semibold'}>Send</button>
//                         </>
//                     }
//                 </form>
//             </>
//         </div>
//     );
// };
// export default RequestTimelineForm;
//
// type FormData = {
//     timeline: string
//     email?: string
// }