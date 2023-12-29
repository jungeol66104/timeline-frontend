import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectIsTimelineInfo, updateIsTimelineInfo} from "@/store/slices/appearanceSlice";
import Image from "next/image";
import CloseSVG from '@/public/svg/close.svg'

const TimelineInfo = () => {
    const dispatch = useDispatch()
    const isTimelineInfo = useSelector(selectIsTimelineInfo)

    return (
        <>
            {isTimelineInfo
                ? <div onClick={() => dispatch(updateIsTimelineInfo()) } className={'fixed left-0 top-0 w-full h-full bg-black opacity-50'} style={{zIndex: 5001}}></div>
                : <></>
            }
            <div className={`fixed w-screen h-[380px] bg-white rounded-t-2xl left-0 bottom-0 transform duration-300 ease-in-out ${isTimelineInfo ? 'translate-y-0' : 'translate-y-full'}`} style={{zIndex: 5002}}>
                <div className={'relative flex justify-center items-center w-full h-[50px] border-b-[1px]'}>
                    <span className={'font-bold text-md pt-[3px]'}>타임라인 정보</span>
                    <button onClick={() => dispatch(updateIsTimelineInfo())} className={'absolute top-[15px] right-[15px]'}><Image src={CloseSVG} alt={'close'} width={20} height={20} /></button>
                </div>
                <div className={'px-[20px]'}>
                    <div className={'mt-[20px]'}>
                        <span className={'font-bold'}>깊이</span>
                        <div className={'relative mt-[30px] w-full px-[10px]'}>
                            <div className={'w-full h-[1px] bg-black'}></div>
                            <div className={'absolute top-[-2px] flex flex-col items-center gap-1.5'}>
                                <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
                                <div className="absolute top-2.5 text-sm text-gray-500">3</div>
                            </div>
                            <div className={'absolute right-0 top-[-15px] flex flex-col items-center gap-1.5'}>
                                <div className={'w-[30px] h-[30px] border-[1px] rounded-full bg-white drop-shadow-md'}></div>
                                <div className={'text-sm'}>1/3</div>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-[60px]'}>
                        <span className={'font-bold'}>위치</span>
                        <div className="flex justify-center">
                            <div className={'mt-[20px] px-[10px] flex gap-[100px]'}>
                                <div className={'flex flex-col items-center gap-2.5'}>
                                    <span className={'text-sm text-gray-500'}>현재 깊이</span>
                                    <div className={'w-[20px] h-[100px] bg-black'}></div>
                                </div>
                                <div className={'flex flex-col items-center gap-2.5'}>
                                    <span className={'text-sm text-gray-500'}>전체 깊이</span>
                                    <div className={'w-[20px] h-[100px] bg-black'}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default TimelineInfo;
