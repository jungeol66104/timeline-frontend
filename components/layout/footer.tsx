import React from 'react';
import {useSelector} from "react-redux";
import {selectIsBottomEnd} from "@/store/slices/appearanceSlice";

const Footer = () => {
    const isBottomEnd = useSelector(selectIsBottomEnd);
    const isHidden = !isBottomEnd

    return (
        <div className={`${isHidden && 'hidden'} bg-gray-100 px-4 py-6 flex flex-col gap-2.5`}>
            <div className={'text-sm'}>© 2024 Timeline</div>
            <hr/>
            <div className={'text-[10px]'}>Contact: project.yaha@gmail.com | Hosting Service Provider: AWS</div>
        </div>
    );
};

export default Footer;
