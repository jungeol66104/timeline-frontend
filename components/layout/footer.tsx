import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";

const Footer = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd);
    const isHidden = !isBottomEnd

    return (
        <footer className={`${isHidden && 'hidden'} bg-gray-100 flex flex-col`}>
            <div className={'px-4 py-6 flex flex-col gap-2.5 w-full max-w-[630px]'}>
                <div className={'text-sm text-[#222222]'}>© 2024 Timeline</div>
                <hr/>
                <div className={'text-[10px] text-[#6A6A6A]'}>Contact: project.yaha@gmail.com | Web Hosting: Vercel | Server Hosting: AWS</div>
            </div>
        </footer>
    );
};

export default Footer;
