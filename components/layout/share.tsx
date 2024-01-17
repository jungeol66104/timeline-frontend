import React from 'react';
import Image from "next/image";
import LinkSVG from '@/public/svg/link.svg'
import KakaotalkSVG from '@/public/svg/kakaotalk.svg'
import XSVG from '@/public/svg/x.svg'
import FacebookSVG from '@/public/svg/facebook.svg'
import MoreSVG from '@/public/svg/more.svg'
import {useSelector} from "react-redux";
import {selectIsShare} from "@/store/slices/appearanceSlice";


const Share = () => {
    const isShare = useSelector(selectIsShare)

    const bottom = isShare ? 0 : -150
    return (
        <div className={'share fixed w-full max-w-lg h-[150px] left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex:5002, bottom: bottom,  transition: 'bottom 0.3s'}}>
            <h2 className={'font-semibold text-md py-2.5 border-b-[1px] w-full text-center'}>공유</h2>
            <div className={'w-full px-5 shrink-0 flex gap-[30px] py-5 overflow-x-auto'}>
                <div className={'flex flex-col w-fit shrink-0 gap-2.5 items-center'}>
                    <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={LinkSVG} alt={'link copy'} width={24} height={24} /></button>
                    <div className={'text-xs'}>링크 복사</div>
                </div>
                <div className={'flex flex-col w-fit shrink-0  gap-2.5 items-center'}>
                    <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={KakaotalkSVG} alt={'kakaotalk'} width={24} height={24} /></button>
                    <div className={'text-xs'}>카카오톡</div>
                </div>
                <div className={'flex flex-col w-fit shrink-0  gap-2.5 items-center'}>
                    <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={XSVG} alt={'x'} width={18} height={18} /></button>
                    <div className={'text-xs'}>X</div>
                </div>
                <div className={'flex flex-col w-fit shrink-0 gap-2.5 items-center'}>
                    <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={FacebookSVG} alt={'facebook'} width={24} height={24} /></button>
                    <div className={'text-xs'}>페이스북</div>
                </div>
                <div className={'flex flex-col w-fit shrink-0 gap-2.5 items-center'}>
                    <button className={'w-[40px] h-[40px] border-[1px] border-gray-600 rounded-full flex justify-center items-center'}><Image src={MoreSVG} alt={'more'} width={24} height={24} /></button>
                    <div className={'text-xs'}>더보기</div>
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Share;
