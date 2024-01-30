import React from 'react';
import Image from "next/image";
import LinkSVG from '@/public/svg/link.svg'
import KakaotalkSVG from '@/public/svg/kakaotalk.svg'
import XSVG from '@/public/svg/x.svg'
import FacebookSVG from '@/public/svg/facebook.svg'
import MoreSVG from '@/public/svg/more.svg'
import {useDispatch, useSelector} from "react-redux";
import {selectIsShare} from "@/store/slices/appearanceSlice";
import LinkCopyButton from "@/components/layout/share/linkCopyButton";
import KakaotalkButton from "@/components/layout/share/kakaotalkButton";
import XButton from "@/components/layout/share/xButton";
import FacebookButton from "@/components/layout/share/facebookButton";
import Script from "next/script";


const Share = () => {
    const dispatch = useDispatch()
    const isShare = useSelector(selectIsShare)

    const bottom = isShare ? 0 : -150
    return (
        <>
            <div className={'share fixed w-full max-w-lg h-[150px] left-1/2 transform -translate-x-1/2 bg-white rounded-t-2xl flex flex-col items-center'} style={{zIndex:5002, bottom: bottom,  transition: 'bottom 0.3s'}}>
                <h2 className={'font-semibold text-md py-2.5 border-b-[1px] w-full text-center'}>Share</h2>
                <div className={'w-full px-5 shrink-0 flex gap-[30px] py-5 overflow-x-auto'}>
                    <LinkCopyButton />
                    <XButton />
                    <FacebookButton />
                    <KakaotalkButton />
                </div>
            </div>
        </>

);
};

export default Share;
