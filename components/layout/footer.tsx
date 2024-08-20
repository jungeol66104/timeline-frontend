import React from 'react';
import Link from "next/link";
import {useSelector} from "react-redux";
import {selectIsBottomEnd, selectIsMaintenance, updateIsMaintenance} from "@/store/slices/appearanceSlice";

const Footer = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd);
    const isMaintenance = useSelector(selectIsMaintenance)
    const isHidden = !isBottomEnd || isMaintenance

    return (
        <footer className={`${isHidden && 'hidden'} flex flex-col bg-[#F2F2F259] border-t-[1px] border-[#E5E7EB]`}>
            <div className={'px-4 py-6 flex flex-col gap-2.5 w-full max-w-[630px]'}>
                <div className={'text-xs text-[#222222]'}>© 2024 Timeline</div>
                <hr/>
                <div className={'flex gap-1 flex-wrap text-[10px] text-[#6A6A6A]'}>
                    <Link href={'/policies/terms'} className={'text-blue-700 hover:underline'}>Terms of use</Link>
                    <span>|</span>
                    <Link href={'/policies/privacy'} className={'text-blue-700 hover:underline'}>Privacy</Link>
                    <span>|</span>
                    Contact: <Link href={'mailto:project.yaha@gmail.com'} className={'text-blue-700 hover:underline'}>project.yaha@gmail.com</Link>
                    <span>|</span>
                    Web Hosting: Vercel
                    <span>|</span>
                    Server Hosting: AWS
                </div>
            </div>
        </footer>
    )
}

export default Footer;
